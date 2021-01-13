import { ActionGroup, Button, Form, PageSection } from "@patternfly/react-core";
import { useTranslation } from "react-i18next";
import React from "react";
import { KerberosSettingsRequired } from "./kerberos/KerberosSettingsRequired";
import { KerberosSettingsCache } from "./kerberos/KerberosSettingsCache";
import { useHistory } from "react-router-dom";
import { useRealm } from "../context/realm-context/RealmContext";

export const UserFederationKerberosSettings = () => {
  const { t } = useTranslation("user-federation");
  const history = useHistory();
  const { realm } = useRealm();

  return (
    <>
      <PageSection variant="light">
        <KerberosSettingsRequired showSectionHeading />
      </PageSection>
      <PageSection variant="light" isFilled>
        <KerberosSettingsCache showSectionHeading />
        <Form>
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
