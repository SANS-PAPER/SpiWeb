// types/UserProfile.ts

export interface UserProfile {
    id: string;
    name: string;
    email: string;
    phoneNumber?: string;
    jobTitle?: string;
    summaryBio?: string;
    isActive?: boolean;
    profile?: {
        photo?: string;
        address?: string;
        firstName?: string;
        lastName?: string;
        city?: string;
        stateProvince?: string;
        country?: string;
    };
    availables?: {
        availableToWork?: boolean;
        preferedLocation?: string;
        jobType?: {
            id: string;
            description?: string;
        }
    };
    }
  
  export interface UseUserDataResult {
    dataUser: UserProfile[];
    errorUser: Error | null;
    isLoadingUser: boolean;
  }
  