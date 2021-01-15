import { Wizard } from "@patternfly/react-core";
import { useTranslation } from "react-i18next";
import React from "react";
import { KerberosSettingsRequired } from "./kerberos/KerberosSettingsRequired";
import { KerberosSettingsCache } from "./kerberos/KerberosSettingsCache";
import ComponentRepresentation from "keycloak-admin/lib/defs/componentRepresentation";
import { useForm } from "react-hook-form";

export const UserFederationKerberosWizard = () => {
  const { t } = useTranslation("user-federation");
  const form = useForm<ComponentRepresentation>({ mode: "onChange" });

  const steps = [
    {
      name: t("requiredSettings"),
      component: (
        <KerberosSettingsRequired form={form} showSectionHeading showSectionDescription />
      ),
    },
    {
      name: t("cacheSettings"),
      component: (
        <KerberosSettingsCache form={form} showSectionHeading showSectionDescription />
      ),
      nextButtonText: t("common:finish"), // TODO: needs to disable until cache policy is valid
    },
  ];

  return (
    <Wizard
      // Because this is an inline wizard, this title and description should be put into the page. Specifying them here causes the wizard component to make a header that would be used on a modal.
      // title={t("addKerberosWizardTitle")}
      // description={helpText("addKerberosWizardDescription")}
      steps={steps}
    />
  );
};
