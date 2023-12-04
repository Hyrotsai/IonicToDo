export interface userLogged {
  providerData: provider[];
  uid: string;
  email: string;
}

interface provider {
  displayName: string;
  email: string;
  photoURL: string;
  providerId: string;
  uid: string;
}

export interface userFirebase {
  displayName: string;
  email: string;
  photoURL: string;
  uid: string;
  finishedTask: Task[];
  unfinishedTask: Task[];
}

export interface Task {
  alarm: boolean;
  date: string;
  title: string;
  id: string;
  finished: boolean;
}

export interface colorTask {
  date: string;
  id?: string;
  textColor?: string;
  backgroundColor: string;
}
