import {
  FormGroup,
  Select,
  SelectOption,
  SelectVariant,
  TextInput,
} from "@patternfly/react-core";
import { useTranslation } from "react-i18next";
import React, { useState } from "react";
import { HelpItem } from "../../components/help-enabler/HelpItem";
import { UseFormMethods, Controller } from "react-hook-form";
import { FormAccess } from "../../components/form-access/FormAccess";
import { WizardSectionHeader } from "../../components/wizard-section-header/WizardSectionHeader";

export type LdapSettingsGeneralProps = {
  form: UseFormMethods;
  showSectionHeading?: boolean;
  showSectionDescription?: boolean;
};

export const LdapSettingsGeneral = ({
  form,
  showSectionHeading = false,
  showSectionDescription = false,
}: LdapSettingsGeneralProps) => {
  const { t } = useTranslation("user-federation");
  const helpText = useTranslation("user-federation-help").t;

  const [isVendorDropdownOpen, setIsVendorDropdownOpen] = useState(false);

  return (
    <>
      {showSectionHeading && (
        <WizardSectionHeader
          title={t("generalOptions")}
          description={helpText("ldapGeneralOptionsSettingsDescription")}
          showDescription={showSectionDescription}
        />
      )}
      <FormAccess role="manage-realm" isHorizontal>
        <FormGroup
          label={t("consoleDisplayName")}
          labelIcon={
            <HelpItem
              helpText={helpText("consoleDisplayNameHelp")}
              forLabel={t("consoleDisplayName")}
              forID="kc-console-display-name"
            />
          }
          fieldId="kc-console-display-name"
          isRequired
        >
          {/* These hidden fields are required so data object written back matches data retrieved */}
          <TextInput
            hidden
            type="text"
            id="kc-console-id"
            name="id"
            ref={form.register}
          />
          <TextInput
            isRequired
            type="text"
            id="kc-console-display-name"
            name="name"
            ref={form.register}
          />
          <TextInput
            hidden
            type="text"
            id="kc-console-provider-id"
            name="providerId"
            ref={form.register}
          />
          <TextInput
            hidden
            type="text"
            id="kc-console-provider-type"
            name="providerType"
            ref={form.register}
          />
          <TextInput
            hidden
            type="text"
            id="kc-console-parentId"
            name="parentId"
            ref={form.register}
          />
        </FormGroup>
        <FormGroup
          label={t("vendor")}
          labelIcon={
            <HelpItem
              helpText={helpText("vendorHelp")}
              forLabel={t("vendor")}
              forID="kc-vendor"
            />
          }
          fieldId="kc-vendor"
          isRequired
        >
          <Controller
            name="config.vendor[0]"
            defaultValue=""
            control={form.control}
            render={({ onChange, value }) => (
              <Select
                toggleId="kc-vendor"
                required
                onToggle={() => setIsVendorDropdownOpen(!isVendorDropdownOpen)}
                isOpen={isVendorDropdownOpen}
                onSelect={(_, value) => {
                  onChange(value as string);
                  setIsVendorDropdownOpen(false);
                }}
                selections={value}
                variant={SelectVariant.single}
              >
                <SelectOption
                  key={0}
                  value={t("common:choose")}
                  isPlaceholder
                />
                <SelectOption key={1} value="ad">
                  Active Directory
                </SelectOption>
                <SelectOption key={2} value="rhds">
                  Red Hat Directory Server
                </SelectOption>
                <SelectOption key={3} value="tivoli">
                  Tivoli
                </SelectOption>
                <SelectOption key={4} value="edirectory">
                  Novell eDirectory
                </SelectOption>
                <SelectOption key={5} value="other">
                  Other
                </SelectOption>
              </Select>
            )}
          ></Controller>
        </FormGroup>
      </FormAccess>
    </>
  );
};
