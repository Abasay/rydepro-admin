import { Checkbox } from '../LucideUI/checkbox';
import { Card } from '../LucideUI/card';
import { Button } from '../LucideUI/button';
import { ChevronDown, ChevronUp, Save } from 'lucide-react';
import type { AccessRightSection } from './types/access';

type AccessRightsProps = {
  sections: AccessRightSection[];
  onPermissionChange: (
    documentId: string,
    permissionType: 'view' | 'printEmail' | 'edit',
    fieldId: string,
    checked: boolean
  ) => void;
  onDocumentSelect: (documentId: string, checked: boolean) => void;
  onSave: () => void;
  onDocSectionSelect: (sectionId: string, checked: boolean) => void;
  onPermissionSelect: (documentId: string, checked: boolean, permissionType: 'view' | 'printEmail' | 'edit') => void;
  onModalClose: (sectionId: string) => void;
};

const AccessRights = ({
  sections,
  onPermissionChange,
  onDocumentSelect,
  onSave,
  onDocSectionSelect,
  onPermissionSelect,
  onModalClose,
}: AccessRightsProps) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4 bg-[#F8F8F8] border border-[#EBEBEB] rounded-xl p-2">
        <div className="space-x-4 bg-none">
          <Button className="text-sm font-medium bg-[#0E0E0E] ">Documents</Button>
          <Button variant="outline" className="text-sm font-medium bg-transparent border-none">
            Actions
          </Button>
          <Button variant="outline" className="text-sm font-medium bg-transparent border-none">
            Rides
          </Button>
          <Button variant="outline" className="text-sm font-medium bg-transparent border-none">
            Activities
          </Button>
        </div>
      </div>

      {sections.map((section) => (
        <Card key={section.id} className="p-6 flex flex-col gap-6 border-none px-0">
          {/* <h3 className="text-lg font-semibold mb-4">{section.title}</h3> */}
          <div className="flex items-center gap-4 pl-6">
            <button onClick={() => onModalClose(section.id)}>
              {section.closeModal ? (
                <ChevronUp className="text-primary" />
              ) : (
                <ChevronDown className="text-muted-foreground" />
              )}
            </button>
            <Checkbox
              id={section.id}
              checked={section.isSelected}
              onCheckedChange={(checked) => onDocSectionSelect(section.id, checked as boolean)}
            />
            <label htmlFor={section.id} className="text-lg font-bold">
              {section.title}
            </label>
          </div>
          {section.closeModal && (
            <div className="space-y-6 pl-2 ">
              {section.documents.map((document) => (
                <div
                  key={document.id}
                  className=" flex items-start w-full gap-4 border border-[#8A8A8A] rounded-3xl p-5"
                >
                  <div className="flex items-center w-full max-w-[300px] space-x-2 mb-4">
                    <Checkbox
                      id={document.id}
                      checked={document.isSelected}
                      disabled={!section.isSelected}
                      onCheckedChange={(checked) => onDocumentSelect(document.id, checked as boolean)}
                    />
                    <label htmlFor={document.id} className="text-sm font-medium">
                      {document.name}
                    </label>
                  </div>

                  <div className="grid grid-cols-3 w-full gap-8">
                    {Object.entries(document.permissions).map(([type, permission]) => (
                      <div key={type} className="space-y-9">
                        <div className="flex items-center gap-2 ">
                          <Checkbox
                            id={type}
                            checked={permission.isSelected}
                            disabled={!document.isSelected}
                            onCheckedChange={(checked) => {
                              onPermissionSelect(
                                document.id,
                                checked as boolean,
                                type as 'view' | 'printEmail' | 'edit'
                              );
                            }}
                          />
                          <label htmlFor={document.id} className="text-sm font-medium capitalize">
                            {type.replace(/([A-Z])/g, ' $1')}
                          </label>
                        </div>
                        <div className="space-y-5">
                          {permission.fields.map((field) => (
                            <div key={field.id} className="flex items-center space-x-2">
                              <Checkbox
                                id={`${document.id}-${type}-${field.id}`}
                                checked={field.isSelected}
                                onCheckedChange={(checked) =>
                                  onPermissionChange(
                                    document.id,
                                    type as 'view' | 'printEmail' | 'edit',
                                    field.id,
                                    checked as boolean
                                  )
                                }
                                disabled={!document.isSelected}
                              />
                              <label
                                htmlFor={`${document.id}-${type}-${field.id}`}
                                className="text-sm text-secondary font-medium"
                              >
                                {field.name}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      ))}
    </div>
  );
};

export default AccessRights;
