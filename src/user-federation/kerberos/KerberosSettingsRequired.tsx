import React, { useState } from "react";
import {
  FormGroup,
  Select,
  SelectOption,
  SelectVariant,
  Switch,
  TextInput,
} from "@patternfly/react-core";
import { useTranslation } from "react-i18next";
import { UseFormMethods, Controller, useWatch } from "react-hook-form";

import { FormAccess } from "../../components/form-access/FormAccess";

import { HelpItem } from "../../components/help-enabler/HelpItem";
import _ from "lodash";
import { WizardSectionHeader } from "../../components/wizard-section-header/WizardSectionHeader";

export type KerberosSettingsRequiredProps = {
  form: UseFormMethods;
  showSectionHeading?: boolean;
  showSectionDescription?: boolean;
};

export const KerberosSettingsRequired = ({
  form,
  showSectionHeading = false,
  showSectionDescription = false,
}: KerberosSettingsRequiredProps) => {
  const { t } = useTranslation("user-federation");
  const helpText = useTranslation("user-federation-help").t;

  const [isEditModeDropdownOpen, setIsEditModeDropdownOpen] = useState(false);

  const allowPassAuth = useWatch({
    control: form.control,
    name: "config.allowPasswordAuthentication",
  });

  return (
    <>
      {showSectionHeading && (
        <WizardSectionHeader
          title={t("requiredSettings")}
          description={helpText("kerberosRequiredSettingsDescription")}
          showDescription={showSectionDescription}
        />
      )}

      {/* Required settings */}
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
            id="kc-console-display-name"
            name="id"
            ref={form.register}
          />
          <TextInput
            hidden
            type="text"
            id="kc-console-display-name"
            name="providerId"
            ref={form.register}
          />
          <TextInput
            hidden
            type="text"
            id="kc-console-display-name"
            name="providerType"
            ref={form.register}
          />
          <TextInput
            hidden
            type="text"
            id="kc-console-display-name"
            name="parentId"
            ref={form.register}
          />

          <TextInput
            isRequired
            type="text"
            id="kc-console-display-name"
            name="name"
            ref={form.register}
          />
        </FormGroup>

        <FormGroup
          label={t("kerberosRealm")}
          labelIcon={
            <HelpItem
              helpText={helpText("kerberosRealmHelp")}
              forLabel={t("kerberosRealm")}
              forID="kc-kerberos-realm"
            />
          }
          fieldId="kc-kerberos-realm"
          isRequired
        >
          <TextInput
            isRequired
            type="text"
            id="kc-kerberos-realm"
            name="config.kerberosRealm[0]"
            ref={form.register}
          />
        </FormGroup>

        <FormGroup
          label={t("serverPrincipal")}
          labelIcon={
            <HelpItem
              helpText={helpText("serverPrincipalHelp")}
              forLabel={t("serverPrincipal")}
              forID="kc-server-principal"
            />
          }
          fieldId="kc-server-principal"
          isRequired
        >
          <TextInput
            isRequired
            type="text"
            id="kc-server-principal"
            name="config.serverPrincipal[0]"
            ref={form.register}
          />
        </FormGroup>

        <FormGroup
          label={t("keyTab")}
          labelIcon={
            <HelpItem
              helpText={helpText("keyTabHelp")}
              forLabel={t("keyTab")}
              forID="kc-key-tab"
            />
          }
          fieldId="kc-key-tab"
          isRequired
        >
          <TextInput
            isRequired
            type="text"
            id="kc-key-tab"
            name="config.keyTab[0]"
            ref={form.register}
          />
        </FormGroup>

        <FormGroup
          label={t("debug")}
          labelIcon={
            <HelpItem
              helpText={helpText("debugHelp")}
              forLabel={t("debug")}
              forID="kc-debug"
            />
          }
          fieldId="kc-debug"
          hasNoPaddingTop
        >
          {" "}
          <Controller
            name="config.debug"
            defaultValue={false}
            control={form.control}
            render={({ onChange, value }) => (
              <Switch
                id={"kc-debug"}
                isDisabled={false}
                onChange={(value) => onChange([`${value}`])}
                isChecked={value[0] === "true"}
                label={t("common:on")}
                labelOff={t("common:off")}
              />
            )}
          ></Controller>
        </FormGroup>

        <FormGroup
          label={t("allowPasswordAuthentication")}
          labelIcon={
            <HelpItem
              helpText={helpText("allowPasswordAuthenticationHelp")}
              forLabel={t("allowPasswordAuthentication")}
              forID="kc-allow-password-authentication"
            />
          }
          fieldId="kc-allow-password-authentication"
          hasNoPaddingTop
        >
          <Controller
            name="config.allowPasswordAuthentication"
            defaultValue={false}
            control={form.control}
            render={({ onChange, value }) => (
              <Switch
                id={"kc-allow-password-authentication"}
                isDisabled={false}
                onChange={(value) => onChange([`${value}`])}
                isChecked={value[0] === "true"}
                label={t("common:on")}
                labelOff={t("common:off")}
              />
            )}
          ></Controller>
        </FormGroup>

        {_.isEqual(allowPassAuth, ["true"]) ? (
          <FormGroup
            label={t("editMode")}
            labelIcon={
              <HelpItem
                helpText={helpText("editModeKerberosHelp")}
                forLabel={t("editMode")}
                forID="kc-edit-mode"
              />
            }
            fieldId="kc-edit-mode"
          >
            {" "}
            <Controller
              name="config.editMode"
              defaultValue={t("common:selectOne")}
              control={form.control}
              render={({ onChange, value }) => (
                <Select
                  toggleId="kc-edit-mode"
                  required
                  onToggle={() =>
                    setIsEditModeDropdownOpen(!isEditModeDropdownOpen)
                  }
                  isOpen={isEditModeDropdownOpen}
                  onSelect={(_, value) => {
                    onChange(value as string);
                    setIsEditModeDropdownOpen(false);
                  }}
                  selections={value}
                  variant={SelectVariant.single}
                >
                  <SelectOption
                    key={0}
                    value={t("common:selectOne")}
                    isPlaceholder
                  />
                  <SelectOption key={1} value="READ_ONLY" />
                  <SelectOption key={2} value="UNSYNCED" />
                </Select>
              )}
            ></Controller>
          </FormGroup>
        ) : (
          <></>
        )}

        <FormGroup
          label={t("updateFirstLogin")}
          labelIcon={
            <HelpItem
              helpText={helpText("updateFirstLoginHelp")}
              forLabel={t("updateFirstLogin")}
              forID="kc-update-first-login"
            />
          }
          fieldId="kc-update-first-login"
          hasNoPaddingTop
        >
          <Controller
            name="config.updateProfileFirstLogin"
            defaultValue={false}
            control={form.control}
            render={({ onChange, value }) => (
              <Switch
                id={"kc-update-first-login"}
                isDisabled={false}
                onChange={(value) => onChange([`${value}`])}
                isChecked={value[0] === "true"}
                label={t("common:on")}
                labelOff={t("common:off")}
              />
            )}
          ></Controller>
        </FormGroup>
      </FormAccess>
    </>
  );
};
