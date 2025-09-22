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

export interface PricingInterface {
  hourly: {
    minHours: number;
    maxHours: number;
  };
  peakHours: {
    startHour: string;
    endHour: string;
    startDate: string;
    endDate: string;
    dateSpecific: string;
    variable: string;
    weekDays: string[];
  };
  waitTime: {
    minimum: string;
    maximum: string;
  };
  surge: {
    startHour: string;
    endHour: string;
    startDate: string;
    endDate: string;
    dateSpecific: string;
    variable: string;
    weekDays: string[];
  };
  _id: string;
  zoneFrom: string;
  zoneTo: string;
  serviceName: string;
  formulaName: string;
  startHour: string;
  endHour: string;
  startDate: string;
  endDate: string;
  weekDays: string[];
  mileRestrictions: string;
  timeRestrictions: string;
  minFare: string;
  maxFare: string;
  variable: string;
  vehicleId: string;
  pricingFee: PricingFee[];
  activeVariable: string;
  createdAt: string;
  updatedAt: string;
}

export interface PricingFee {
  category: string;
  fees: {
    variables: {
      name: string;
      value: string;
    }[];
    rows: {
      name: string;
      values: {
        value1: string;
        value2: string;
      }[];
    }[];
  }[];
}
