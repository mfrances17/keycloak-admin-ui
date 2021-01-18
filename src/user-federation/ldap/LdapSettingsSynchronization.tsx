import { FormGroup, Switch, TextInput } from "@patternfly/react-core";
import { useTranslation } from "react-i18next";
import React from "react";
import { HelpItem } from "../../components/help-enabler/HelpItem";
import { UseFormMethods, Controller } from "react-hook-form";
import { FormAccess } from "../../components/form-access/FormAccess";
import { WizardSectionHeader } from "../../components/wizard-section-header/WizardSectionHeader";

export type LdapSettingsSynchronizationProps = {
  form: UseFormMethods;
  showSectionHeading?: boolean;
  showSectionDescription?: boolean;
};

export const LdapSettingsSynchronization = ({
  form,
  showSectionHeading = false,
  showSectionDescription = false,
}: LdapSettingsSynchronizationProps) => {
  const { t } = useTranslation("user-federation");
  const helpText = useTranslation("user-federation-help").t;

  return (
    <>
      {showSectionHeading && (
        <WizardSectionHeader
          title={t("synchronizationSettings")}
          description={helpText("ldapSynchronizationSettingsDescription")}
          showDescription={showSectionDescription}
        />
      )}
      <FormAccess role="manage-realm" isHorizontal>
        <FormGroup
          hasNoPaddingTop
          label={t("importUsers")}
          labelIcon={
            <HelpItem
              helpText={helpText("importUsersHelp")}
              forLabel={t("importUsers")}
              forID="kc-import-users"
            />
          }
          fieldId="kc-import-users"
        >
          <Controller
            name="config.importEnabled"
            defaultValue={false}
            control={form.control}
            render={({ onChange, value }) => (
              <Switch
                id={"kc-import-users"}
                name="importEnabled"
                label={t("common:on")}
                labelOff={t("common:off")}
                onChange={(value) => onChange([`${value}`])}
                isChecked={value[0] === "true"}
                isDisabled={false}
              />
            )}
          ></Controller>
        </FormGroup>
        <FormGroup
          label={t("batchSize")}
          labelIcon={
            <HelpItem
              helpText={helpText("batchSizeHelp")}
              forLabel={t("batchSize")}
              forID="kc-batch-size"
            />
          }
          fieldId="kc-batch-size"
        >
          <TextInput
            type="text"
            id="kc-batch-size"
            name="config.batchSizeForSync"
            ref={form.register}
          />
        </FormGroup>
        <FormGroup
          hasNoPaddingTop
          label={t("periodicFullSync")}
          labelIcon={
            <HelpItem
              helpText={helpText("periodicFullSyncHelp")}
              forLabel={t("periodicFullSync")}
              forID="kc-periodic-full-sync"
            />
          }
          fieldId="kc-periodic-full-sync"
        >
          <TextInput
            type="text"
            id="kc-batch-size"
            name="config.fullSyncPeriod"
            ref={form.register}
          />
        </FormGroup>
        <FormGroup
          label={t("periodicChangedUsersSync")}
          labelIcon={
            <HelpItem
              helpText={helpText("periodicChangedUsersSyncHelp")}
              forLabel={t("periodicChangedUsersSync")}
              forID="kc-periodic-changed-users-sync"
            />
          }
          fieldId="kc-periodic-changed-users-sync"
          hasNoPaddingTop
        >
          <TextInput
            type="text"
            id="kc-batch-size"
            name="config.changedSyncPeriod"
            ref={form.register}
          />
        </FormGroup>
      </FormAccess>
    </>
  );
};
