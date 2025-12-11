import { BaseDirectory, exists, readTextFile, writeTextFile, mkdir } from '@tauri-apps/plugin-fs';
import { Member, Task } from '../types';
import { INITIAL_MEMBERS } from '../constants';

const DATA_FILE = 'enjaz_data.json';

interface AppData {
  members: Member[];
  tasks: Task[];
  hasVisitedApp_v1: boolean;
}

const DEFAULT_DATA: AppData = {
  members: INITIAL_MEMBERS,
  tasks: [],
  hasVisitedApp_v1: false,
};

// Helper to migrate data from localStorage if available
const getLocalStorageData = (): Partial<AppData> => {
  try {
    const storedMembers = localStorage.getItem('enjaz_members');
    const storedTasks = localStorage.getItem('enjaz_tasks');
    const hasVisited = localStorage.getItem('hasVisitedApp_v1');

    return {
      members: storedMembers ? JSON.parse(storedMembers) : undefined,
      tasks: storedTasks ? JSON.parse(storedTasks) : undefined,
      hasVisitedApp_v1: hasVisited === 'true',
    };
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return {};
  }
};

export const saveAppData = async (data: Partial<AppData>) => {
  try {
    // Read existing data first to merge
    let currentData = await loadAppData();
    
    const newData = {
      ...currentData,
      ...data
    };

    await writeTextFile(DATA_FILE, JSON.stringify(newData, null, 2), {
      baseDir: BaseDirectory.AppLocalData,
    });
    console.log('Data saved successfully');
  } catch (error) {
    console.error('Error saving data:', error);
  }
};

export const loadAppData = async (): Promise<AppData> => {
  try {
    // Check if file exists in AppLocalData
    // Note: AppLocalData persists across updates/reinstalls on most OSs (like %LocalAppData% on Windows)
    const fileExists = await exists(DATA_FILE, { baseDir: BaseDirectory.AppLocalData });

    if (fileExists) {
      const content = await readTextFile(DATA_FILE, { baseDir: BaseDirectory.AppLocalData });
      return JSON.parse(content);
    } else {
      // First time run or file deleted: Try to migrate from localStorage or use defaults
      const localData = getLocalStorageData();
      const initialData = {
        members: localData.members || DEFAULT_DATA.members,
        tasks: localData.tasks || DEFAULT_DATA.tasks,
        hasVisitedApp_v1: localData.hasVisitedApp_v1 || DEFAULT_DATA.hasVisitedApp_v1,
      };

      // Ensure directory exists (it should by default for AppLocalData, but good practice)
      // await mkdir('', { baseDir: BaseDirectory.AppLocalData, recursive: true });

      // Save initial data to persistent storage
      await writeTextFile(DATA_FILE, JSON.stringify(initialData, null, 2), {
        baseDir: BaseDirectory.AppLocalData,
      });

      return initialData;
    }
  } catch (error) {
    console.error('Error loading data:', error);
    return DEFAULT_DATA;
  }
};
