import {
  ActionGroup,
  AlertVariant,
  Button,
  Form,
  PageSection,
} from "@patternfly/react-core";
import { useTranslation } from "react-i18next";
import React, { useEffect } from "react";

import { LdapSettingsAdvanced } from "./ldap/LdapSettingsAdvanced";
import { LdapSettingsKerberosIntegration } from "./ldap/LdapSettingsKerberosIntegration";
import { LdapSettingsCache } from "./ldap/LdapSettingsCache";
import { LdapSettingsSynchronization } from "./ldap/LdapSettingsSynchronization";
import { LdapSettingsGeneral } from "./ldap/LdapSettingsGeneral";
import { LdapSettingsConnection } from "./ldap/LdapSettingsConnection";
import { LdapSettingsSearching } from "./ldap/LdapSettingsSearching";
import { ScrollForm } from "../components/scroll-form/ScrollForm";

import { useHistory, useParams } from "react-router-dom";
import { useRealm } from "../context/realm-context/RealmContext";
import { convertToFormValues } from "../util";
import { useAlerts } from "../components/alert/Alerts";
import { useAdminClient } from "../context/auth/AdminClient";
import ComponentRepresentation from "keycloak-admin/lib/defs/componentRepresentation";

import { useForm } from "react-hook-form";

export const UserFederationLdapSettings = () => {
  const { t } = useTranslation("user-federation");
  const form = useForm<ComponentRepresentation>();
  const history = useHistory();
  const adminClient = useAdminClient();
  const { realm } = useRealm();

  const { id } = useParams<{ id: string }>();

  const { addAlert } = useAlerts();

  // const { control, setValue } = useForm<ComponentRepresentation>();

  const convertToDays = (num: string) => {
    switch (num) {
      case "1":
        return t("common:Sunday");
      case "2":
        return t("common:Monday");
      case "3":
        return t("common:Tuesday");
      case "4":
        return t("common:Wednesday");
      case "5":
        return t("common:Thursday");
      case "6":
        return t("common:Friday");
      case "7":
        return t("common:Saturday");
      default:
        return t("common:selectOne");
    }
  };

  const convertVendorNames = (vendorName: string) => {
    switch (vendorName) {
      case "ad":
        return "Active Directory";
      case "rhds":
        return "Red Hat Directory Server";
      case "tivoli":
        return "Tivoli";
      case "edirectory":
        return "Novell eDirectory";
      case "other":
        return "Other";
      default:
        return t("common:choose");
    }
  };

  const convertSearchScopes = (scope: string) => {
    switch (scope) {
      case "1":
      default:
        return `${t("oneLevel")}`;
      case "2":
        return `${t("subtree")}`;
    }
  };

  const convertTruststoreSpiValues = (truststoreValue: string) => {
    switch (truststoreValue) {
      case "always":
        return `${t("always")}`;
      case "never":
        return `${t("never")}`;
      case "ldapsOnly":
      default:
        return `${t("onlyLdaps")}`;
    }
  };

  useEffect(() => {
    (async () => {
      const fetchedComponent = await adminClient.components.findOne({ id });
      if (fetchedComponent) {
        setupForm(fetchedComponent);
      }
    })();
  }, []);

  const setupForm = (component: ComponentRepresentation) => {
    Object.entries(component).map((entry) => {
      if (entry[0] === "config") {
        convertToFormValues(entry[1], "config", form.setValue);
        if (entry[1].evictionDay) {
          form.setValue(
            "config.evictionDay",
            convertToDays(entry[1].evictionDay[0])
          );
        }
        if (entry[1].vendor) {
          form.setValue(
            "config.vendor",
            convertVendorNames(entry[1].vendor[0])
          );
        }
        if (entry[1].searchScope) {
          form.setValue(
            "config.searchScope",
            convertSearchScopes(entry[1].searchScope[0])
          );
        }
        if (entry[1].useTruststoreSpi) {
          form.setValue(
            "config.useTruststoreSpi",
            convertTruststoreSpiValues(entry[1].useTruststoreSpi[0])
          );
        }
      } else {
        form.setValue(entry[0], entry[1]);
      }
    });
  };

  const save = async (component: ComponentRepresentation) => {
    try {
      await adminClient.components.update({ id }, component);
      setupForm(component as ComponentRepresentation);
      addAlert(t("saveSuccess"), AlertVariant.success);
    } catch (error) {
      addAlert(`${t("saveError")} '${error}'`, AlertVariant.danger);
    }
  };

  return (
    <>
      <PageSection variant="light" isFilled>
        <ScrollForm
          sections={[
            t("generalOptions"),
            t("connectionAndAuthenticationSettings"),
            t("ldapSearchingAndUpdatingSettings"),
            t("synchronizationSettings"),
            t("kerberosIntegration"),
            t("cacheSettings"),
            t("advancedSettings"),
          ]}
        >
          <LdapSettingsGeneral form={form} />
          <LdapSettingsConnection form={form} />
          <LdapSettingsSearching form={form} />
          <LdapSettingsSynchronization form={form} />
          <LdapSettingsKerberosIntegration form={form} />
          <LdapSettingsCache form={form} />
          <LdapSettingsAdvanced form={form} />
        </ScrollForm>
        <Form onSubmit={form.handleSubmit(save)}>
          <ActionGroup>
            <Button variant="primary" type="submit">
              {t("common:save")}
            </Button>
            <Button
              variant="link"
              onClick={() => history.push(`/${realm}/user-federation`)}
            >
              {t("common:cancel")}
            </Button>
          </ActionGroup>
        </Form>
      </PageSection>
    </>
  );
};
