export interface SkoolHarvest {
  success: boolean;
  data: SkoolData;
  url: string;
  timestamp: string;
}

export interface SkoolData {
  props: {
    pageProps: {
      allGroups?: SkoolGroup[];
      currentGroup?: SkoolGroup;
      self: SkoolUser;
    };
  };
}

export interface SkoolGroup {
  id: string;
  name: string;
  metadata: {
    color: string;
    description: string;
    displayName: string;
    coverSmallUrl: string;
    logoUrl: string;
    totalMembers: number;
    totalOnlineMembers: number;
    totalPosts: number;
    owner: SkoolUser;
    levels: string; // This is a JSON string in the metadata
  };
  createdAt: string;
}

export interface SkoolUser {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  metadata: {
    bio: string;
    location: string;
    pictureProfile: string;
    online: number;
  };
}
