export type DocumentField = {
  id: string;
  name: string;
  isSelected: boolean;
};

export type DocumentPermission = {
  id: string;
  name: string;
  fields: DocumentField[];
  isSelected?: boolean;
};

export type Document = {
  id: string;
  name: string;
  isSelected: boolean;
  permissions: {
    view: DocumentPermission;
    printEmail: DocumentPermission;
    edit: DocumentPermission;
  };
};

export type AccessRightSection = {
  id: string;
  title: string;
  documents: Document[];
  closeModal: boolean;
  isSelected?: boolean;
};
