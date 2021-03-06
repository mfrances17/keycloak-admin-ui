import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Controller, FormProvider, useForm } from "react-hook-form";
import {
  ActionGroup,
  AlertVariant,
  Button,
  ButtonVariant,
  Divider,
  DropdownItem,
  Form,
  PageSection,
  Tab,
  TabTitleText,
} from "@patternfly/react-core";

import type IdentityProviderRepresentation from "keycloak-admin/lib/defs/identityProviderRepresentation";
import { FormAccess } from "../../components/form-access/FormAccess";
import { ScrollForm } from "../../components/scroll-form/ScrollForm";
import { ViewHeader } from "../../components/view-header/ViewHeader";
import { useFetch, useAdminClient } from "../../context/auth/AdminClient";
import { toUpperCase } from "../../util";
import { GeneralSettings } from "./GeneralSettings";
import { AdvancedSettings } from "./AdvancedSettings";
import { useConfirmDialog } from "../../components/confirm-dialog/ConfirmDialog";
import { useAlerts } from "../../components/alert/Alerts";
import { useRealm } from "../../context/realm-context/RealmContext";
import { KeycloakTabs } from "../../components/keycloak-tabs/KeycloakTabs";
import { ExtendedNonDiscoverySettings } from "./ExtendedNonDiscoverySettings";
import { DiscoverySettings } from "./DiscoverySettings";
import { OIDCGeneralSettings } from "./OIDCGeneralSettings";
import { OIDCAuthentication } from "./OIDCAuthentication";

type HeaderProps = {
  onChange: (value: boolean) => void;
  value: boolean;
  save: () => void;
  toggleDeleteDialog: () => void;
};

const Header = ({ onChange, value, save, toggleDeleteDialog }: HeaderProps) => {
  const { t } = useTranslation("identity-providers");
  const { id } = useParams<{ id: string }>();

  const [toggleDisableDialog, DisableConfirm] = useConfirmDialog({
    titleKey: "identity-providers:disableProvider",
    messageKey: t("disableConfirm", { provider: id }),
    continueButtonLabel: "common:disable",
    onConfirm: () => {
      onChange(!value);
      save();
    },
  });

  return (
    <>
      <DisableConfirm />
      <ViewHeader
        titleKey={toUpperCase(id)}
        divider={false}
        dropdownItems={[
          <DropdownItem key="delete" onClick={() => toggleDeleteDialog()}>
            {t("common:delete")}
          </DropdownItem>,
        ]}
        isEnabled={value}
        onToggle={(value) => {
          if (!value) {
            toggleDisableDialog();
          } else {
            onChange(value);
            save();
          }
        }}
      />
    </>
  );
};

export const DetailSettings = () => {
  const { t } = useTranslation("identity-providers");
  const { id } = useParams<{ id: string }>();

  const [provider, setProvider] = useState<IdentityProviderRepresentation>();
  const form = useForm<IdentityProviderRepresentation>();
  const { handleSubmit, setValue, getValues, reset } = form;

  const adminClient = useAdminClient();
  const { addAlert } = useAlerts();
  const history = useHistory();
  const { realm } = useRealm();

  useFetch(
    () => adminClient.identityProviders.findOne({ alias: id }),
    (provider) => {
      if (provider) {
        setProvider(provider);
        Object.entries(provider).map((entry) => setValue(entry[0], entry[1]));
      }
    },
    []
  );

  const save = async (provider?: IdentityProviderRepresentation) => {
    const p = provider || getValues();
    try {
      await adminClient.identityProviders.update(
        { alias: id },
        { ...p, alias: id, providerId: id }
      );
      setProvider(p);
      addAlert(t("updateSuccess"), AlertVariant.success);
    } catch (error) {
      addAlert(
        t("updateError", {
          error: error.response?.data?.errorMessage || error,
        }),
        AlertVariant.danger
      );
    }
  };

  const [toggleDeleteDialog, DeleteConfirm] = useConfirmDialog({
    titleKey: "identity-providers:deleteProvider",
    messageKey: t("identity-providers:deleteConfirm", { provider: id }),
    continueButtonLabel: "common:delete",
    continueButtonVariant: ButtonVariant.danger,
    onConfirm: async () => {
      try {
        await adminClient.identityProviders.del({ alias: id });
        addAlert(t("deletedSuccess"), AlertVariant.success);
        history.push(`/${realm}/identity-providers`);
      } catch (error) {
        addAlert(t("deleteErrorError", { error }), AlertVariant.danger);
      }
    },
  });

  const sections = [t("generalSettings"), t("advancedSettings")];
  const isOIDC = id.indexOf("oidc") !== -1;

  if (isOIDC) {
    sections.splice(1, 0, t("oidcSettings"));
  }

  return (
    <>
      <DeleteConfirm />
      <Controller
        name="enabled"
        control={form.control}
        defaultValue={true}
        render={({ onChange, value }) => (
          <Header
            value={value}
            onChange={onChange}
            save={save}
            toggleDeleteDialog={toggleDeleteDialog}
          />
        )}
      />

      <PageSection variant="light" className="pf-u-p-0">
        <FormProvider {...form}>
          <KeycloakTabs isBox>
            <Tab
              id="settings"
              eventKey="settings"
              title={<TabTitleText>{t("common:settings")}</TabTitleText>}
            >
              <ScrollForm className="pf-u-px-lg" sections={sections}>
                <FormAccess
                  role="manage-identity-providers"
                  isHorizontal
                  onSubmit={handleSubmit(save)}
                >
                  {!isOIDC && <GeneralSettings create={false} id={id} />}
                  {isOIDC && <OIDCGeneralSettings id={id} />}
                </FormAccess>
                {isOIDC && (
                  <>
                    <DiscoverySettings readOnly={false} />
                    <Form isHorizontal className="pf-u-py-lg">
                      <Divider />
                      <OIDCAuthentication create={false} />
                    </Form>
                    <ExtendedNonDiscoverySettings />
                  </>
                )}
                <FormAccess
                  role="manage-identity-providers"
                  isHorizontal
                  onSubmit={handleSubmit(save)}
                >
                  <AdvancedSettings isOIDC={isOIDC} />
                  <ActionGroup className="keycloak__form_actions">
                    <Button data-testid={"save"} type="submit">
                      {t("common:save")}
                    </Button>
                    <Button
                      data-testid={"revert"}
                      variant="link"
                      onClick={() => {
                        reset(provider);
                      }}
                    >
                      {t("common:revert")}
                    </Button>
                  </ActionGroup>
                </FormAccess>
              </ScrollForm>
            </Tab>
          </KeycloakTabs>
        </FormProvider>
      </PageSection>
    </>
  );
};
