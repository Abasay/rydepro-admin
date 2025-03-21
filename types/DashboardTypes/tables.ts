export interface Header {
  data: string; // Main data or title for the header
  className: string; // CSS classes for styling
  hasIcon?: boolean; // Optional flag for displaying icons
  subHeaders?: SubHeader[]; // Array of subheaders if present
  externalContainer?: boolean; // Flag for external containers
  headerText?: string; // Optional header text for container sections
  containerContent?: ContainerContent | ContainerContent[]; // Nested container content
}

export interface SubHeader {
  data: string; // Subheader title or content
  className: string; // CSS classes for styling
  hasIcon?: boolean; // Optional flag for displaying icons
}

export interface ContainerContent {
  data: string; // Data for nested container content
  className: string; // CSS classes for styling
  externalContainer?: boolean; // Flag for nested containers
  headerText?: string; // Optional header text for nested container sections
  subHeaders?: SubHeader[]; // Nested subheaders within the container
  containerContent?: ContainerContent | ContainerContent[]; // Additional nested container content
}
