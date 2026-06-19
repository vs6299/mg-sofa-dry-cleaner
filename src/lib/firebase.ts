import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, User } from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/spreadsheets');
provider.addScope('https://www.googleapis.com/auth/drive.file');

// Flag to indicate if we are in the middle of a sign-in flow.
let isSigningIn = false;
// Cache the access token in memory.
let cachedAccessToken: string | null = null;

// Listen to auth changes and manage token
export const initAuth = (
  onAuthSuccess?: (user: User, token: string) => void,
  onAuthFailure?: () => void
) => {
  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user) {
      if (cachedAccessToken) {
        if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken);
      } else if (!isSigningIn) {
        // Look in sessionStorage temporarily ONLY for active session lifespan helper
        // but prefer clean local in-memory states per workspace guidelines
        const sessionToken = sessionStorage.getItem('g_oauth_token');
        if (sessionToken) {
          cachedAccessToken = sessionToken;
          if (onAuthSuccess) onAuthSuccess(user, sessionToken);
        } else {
          cachedAccessToken = null;
          if (onAuthFailure) onAuthFailure();
        }
      }
    } else {
      cachedAccessToken = null;
      sessionStorage.removeItem('g_oauth_token');
      if (onAuthFailure) onAuthFailure();
    }
  });
};

// Start Google sign in popup
export const googleSignIn = async (): Promise<{ user: User; accessToken: string } | null> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error('Failed to get access token from Firebase Auth');
    }

    cachedAccessToken = credential.accessToken;
    // Cache helper inside sessionStorage for seamless HMR or page-level refreshes
    sessionStorage.setItem('g_oauth_token', cachedAccessToken);
    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error: any) {
    console.error('Sign in error:', error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

export const logout = async () => {
  await auth.signOut();
  cachedAccessToken = null;
  sessionStorage.removeItem('g_oauth_token');
};

export const getCachedAccessToken = (): string | null => {
  return cachedAccessToken;
};

// ==========================================
// GOOGLE SHEETS API UTILITIES (CLIENT-SIDE)
// ==========================================

export interface Appointment {
  id: string;
  name: string;
  phone: string;
  address: string;
  sofaType: string;
  date: string;
  message: string;
  createdAt: string;
}

/**
 * Searches for an existing "KDS Sofa Care - Bookings" spreadsheet in the user's Drive.
 * If not found, creates a new one and initialises it with the headers.
 */
export async function getOrCreateSpreadsheet(token: string): Promise<string> {
  const query = encodeURIComponent("name = 'KDS Sofa Care - Bookings' and mimeType = 'application/vnd.google-apps.spreadsheet' and trashed = false");
  const searchUrl = `https://www.googleapis.com/drive/v3/files?q=${query}&fields=files(id,name)`;
  
  try {
    const searchRes = await fetch(searchUrl, {
      headers: { Authorization: `Bearer ${token}` },
    });
    
    if (searchRes.ok) {
      const searchData = await searchRes.json();
      if (searchData.files && searchData.files.length > 0) {
        const existingSpreadsheetId = searchData.files[0].id;
        localStorage.setItem('kds_spreadsheet_id', existingSpreadsheetId);
        return existingSpreadsheetId;
      }
    }

    // Spreadsheet not found; let's create a new one
    console.log('Spreadsheet not found, creating a new "KDS Sofa Care - Bookings" Google Sheet...');
    const createRes = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        properties: {
          title: 'KDS Sofa Care - Bookings',
        },
      }),
    });

    if (!createRes.ok) {
      const errText = await createRes.text();
      throw new Error(`Failed to create spreadsheet: ${errText}`);
    }

    const spreadsheet = await createRes.json();
    const spreadsheetId = spreadsheet.spreadsheetId;
    localStorage.setItem('kds_spreadsheet_id', spreadsheetId);

    // Write primary headers and custom formatting/sample bookings
    const initHeadersUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Sheet1!A1:H4?valueInputOption=USER_ENTERED`;
    await fetch(initHeadersUrl, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        values: [
          ['Appointment ID', 'Name', 'Phone', 'Address', 'Sofa Type', 'Preferred Date', 'Notes/Message', 'Created At'],
          ['APT-SAMPLE-1', 'Siddharth', '9876543210', 'Sector 15, Chandigarh', 'L-Shape Sofa', '2026-06-25', 'Requires deep stain removal on armrest.', new Date().toLocaleString()],
          ['APT-SAMPLE-2', 'Dhanlaxmi', '9812345678', 'Phase 3B2, Mohali', 'Fabric Sofa', '2026-06-28', 'Eco-friendly cleaning solvents requested.', new Date().toLocaleString()]
        ],
      }),
    });

    return spreadsheetId;
  } catch (error) {
    console.error('Error in getOrCreateSpreadsheet:', error);
    throw error;
  }
}

/**
 * Appends a new appointment row to the connected Google Spreadsheet.
 */
export async function appendAppointment(spreadsheetId: string, appointment: Appointment, token: string): Promise<boolean> {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Sheet1!A:H:append?valueInputOption=USER_ENTERED`;
  
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        values: [
          [
            appointment.id,
            appointment.name,
            appointment.phone,
            appointment.address,
            appointment.sofaType,
            appointment.date,
            appointment.message,
            appointment.createdAt,
          ],
        ],
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error('Failed to append to spreadsheet:', errText);
      return false;
    }
    return true;
  } catch (error) {
    console.error('Error appending appointment:', error);
    return false;
  }
}

/**
 * Fetches all appointments from the Google Spreadsheet.
 */
export async function fetchAppointmentsFromSheet(spreadsheetId: string, token: string): Promise<Appointment[]> {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Sheet1!A2:H1000`;
  
  try {
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error('Failed to fetch from sheet:', errText);
      return [];
    }

    const data = await res.json();
    if (!data.values) return [];

    return data.values.map((row: any[], index: number) => ({
      id: row[0] || `APT-LOCAL-${index}`,
      name: row[1] || 'Unknown',
      phone: row[2] || '',
      address: row[3] || '',
      sofaType: row[4] || '',
      date: row[5] || '',
      message: row[6] || '',
      createdAt: row[7] || '',
    }));
  } catch (error) {
    console.error('Error fetching appointments:', error);
    return [];
  }
}
