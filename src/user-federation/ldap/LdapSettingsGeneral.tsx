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
          <TextInput
            isRequired
            type="text"
            id="kc-console-display-name"
            name="name"
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
            name="config.vendor"
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
                <SelectOption key={1} value="Active Directory" />
                <SelectOption key={2} value="Red Hat Directory Server" />
                <SelectOption key={3} value="Tivoli" />
                <SelectOption key={4} value="Novell eDirectory" />
                <SelectOption key={5} value="Other" />
              </Select>
            )}
          ></Controller>
        </FormGroup>
      </FormAccess>
    </>
  );
};
