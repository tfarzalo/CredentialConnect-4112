export interface Provider {
  id: string;
  firstName: string;
  lastName: string;
  npi: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive';
  specialties: string[];
  licenses: License[];
  groups: string[]; // Group IDs
  caqhId?: string;
  credentials: Credential[];
  documents: Document[];
  contacts: Contact[];
  createdAt: string;
  updatedAt: string;
}

export interface Group {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'inactive';
  providers: string[]; // Provider IDs
  address: Address;
  contacts: Contact[];
  documents: Document[];
  createdAt: string;
  updatedAt: string;
}

export interface Credential {
  id: string;
  providerId: string;
  type: string;
  status: CredentialingStatus;
  payorId: string;
  startDate: string;
  endDate?: string;
  lastUpdated: string;
  documents: Document[];
  comments: Comment[];
  timeline: TimelineEvent[];
}

export type CredentialingStatus = 
  | 'not_started'
  | 'in_progress'
  | 'under_review'
  | 'issues_to_address'
  | 'denied'
  | 'panel_closed'
  | 'approved'
  | 'commercial_only';

export interface TimelineEvent {
  id: string;
  date: string;
  type: string;
  description: string;
  userId: string;
}

export interface Document {
  id: string;
  type: string;
  name: string;
  url: string;
  uploadedAt: string;
  expiresAt?: string;
}

export interface Contact {
  id: string;
  type: string;
  name: string;
  email: string;
  phone: string;
  primary: boolean;
}

export interface Address {
  street1: string;
  street2?: string;
  city: string;
  state: string;
  zip: string;
}

export interface License {
  id: string;
  type: string;
  number: string;
  state: string;
  expirationDate: string;
  status: 'active' | 'inactive' | 'expired';
}