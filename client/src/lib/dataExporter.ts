/**
 * Utilities for exporting and importing user data in Wird application
 */

// Types of data that can be exported
export interface ExportableData {
  user: {
    username: string;
    mastodonInstance?: string;
    startDate?: string;
    currentVerseIndex: number;
    daysPosted: number;
  };
  posts: Array<{
    verseId: number;
    postedAt: string;
    success: boolean;
    errorMessage?: string;
  }>;
  settings: {
    language: string;
    theme: string;
    postTime: string;
    includeArabic: boolean;
    includeEnglish: boolean;
    includeReference: boolean;
    platforms: {
      mastodon: boolean;
      facebook: boolean;
    };
  };
}

// Create an empty data structure with default values
export function createEmptyExportData(username: string): ExportableData {
  return {
    user: {
      username,
      currentVerseIndex: 0,
      daysPosted: 0,
      startDate: new Date().toISOString(),
    },
    posts: [],
    settings: {
      language: 'en',
      theme: 'system',
      postTime: '05:00',
      includeArabic: true,
      includeEnglish: true,
      includeReference: true,
      platforms: {
        mastodon: true,
        facebook: false,
      },
    },
  };
}

// Export user data to a JSON file
export function exportUserData(data: ExportableData): void {
  // Create a Blob with the JSON data
  const jsonData = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonData], { type: 'application/json' });
  
  // Create a URL for the Blob
  const url = URL.createObjectURL(blob);
  
  // Create a temporary anchor element and trigger a download
  const a = document.createElement('a');
  a.href = url;
  a.download = `wird-data-${data.user.username.replace(/[^a-z0-9]/gi, '-')}-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(a);
  a.click();
  
  // Clean up
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Import user data from a JSON file
export function importUserData(file: File): Promise<ExportableData> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      try {
        if (event.target?.result) {
          const data = JSON.parse(event.target.result as string) as ExportableData;
          // Validate the data structure here if needed
          resolve(data);
        } else {
          reject(new Error('No data found in the file'));
        }
      } catch (error) {
        reject(new Error('Invalid JSON data'));
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Error reading the file'));
    };
    
    reader.readAsText(file);
  });
}

// Save user data to localStorage
export function saveUserDataToLocalStorage(data: ExportableData): void {
  localStorage.setItem('wird-user-data', JSON.stringify(data));
}

// Load user data from localStorage
export function loadUserDataFromLocalStorage(): ExportableData | null {
  const data = localStorage.getItem('wird-user-data');
  if (data) {
    try {
      return JSON.parse(data) as ExportableData;
    } catch (error) {
      console.error('Error parsing user data from localStorage:', error);
      return null;
    }
  }
  return null;
}