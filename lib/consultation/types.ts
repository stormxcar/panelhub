export type ConsultationFormSettings = {
  eyebrow?: string;
  heading?: string;
  description?: string;
  hotline?: string;
  displayEmail?: string;
  commitmentText?: string;
  nameLabel?: string;
  namePlaceholder?: string;
  phoneLabel?: string;
  phonePlaceholder?: string;
  requirementLabel?: string;
  requirementPlaceholder?: string;
  submitButtonText?: string;
  callButtonText?: string;
  drawingButtonText?: string;
  notificationEmail?: string;
  emailSubjectPrefix?: string;
  successMessage?: string;
  errorMessage?: string;
  validationMessage?: string;
  isEnabled?: boolean;
  enableDrawingUpload?: boolean;
  enableGoogleSheets?: boolean;
  enableEmailNotification?: boolean;
};

export type ConsultationPayload = {
  name: string;
  phone: string;
  requirement: string;
  sourceUrl?: string;
  requestId: string;
  website?: string;
};

export type ConsultationResponse = {
  success: boolean;
  partial?: boolean;
  requestId?: string;
  sheetSaved?: boolean;
  emailSent?: boolean;
  message: string;
  code?: string;
  fieldErrors?: Partial<Record<"name" | "phone" | "requirement", string>>;
};
