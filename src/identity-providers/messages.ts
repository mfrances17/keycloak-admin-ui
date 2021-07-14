export default {
  "identity-providers": {
    listExplain:
      "Through Identity Brokering it's easy to allow users to authenticate to Keycloak using external Identity Provider or Social Networks.",
    searchForProvider: "Search for provider",
    provider: "Provider details",
    addProvider: "Add provider",
    addKeycloakOpenIdProvider: "Add Keycloak OpenID Connect provider",
    addOpenIdProvider: "Add OpenID Connect provider",
    manageDisplayOrder: "Manage display order",
    deleteProvider: "Delete provider?",
    deleteConfirm:
      "Are you sure you want to permanently delete the provider '{{provider}}'",
    deletedSuccess: "Provider successfully deleted",
    deleteError: "Could not delete the provider {{error}}",
    disableProvider: "Disable provider?",
    disableConfirm:
      "Are you sure you want to disable the provider '{{provider}}'",
    disableSuccess: "Provider successfully disabled",
    disableError: "Could not disable the provider {{error}}",
    updateSuccess: "Provider successfully updated",
    updateError: "Could not update the provider {{error}}",
    getStarted: "To get started, select a provider from the list below.",
    addIdentityProvider: "Add {{provider}} provider",
    redirectURI: "Redirect URI",
    clientId: "Client ID",
    clientSecret: "Client Secret",
    displayOrder: "Display order",
    createSuccess: "Identity provider successfully created",
    createError: "Could not create the identity provider: {{error}}",
    oderDialogIntro:
      "The order that the providers are listed in the login page or the account console. You can drag the row handles to change the order.",
    manageOrderTableAria:
      "List of identity providers in the order listed on the login page",
    manageOrderItemAria:
      "Press space or enter to begin dragging, and use the arrow keys to navigate up or down. Press enter to confirm the drag, or any other key to cancel the drag operation.",
    onDragStart: "Dragging started for item {{id}}",
    onDragMove: "Dragging item {{id}}",
    onDragCancel: "Dragging cancelled. List is unchanged.",
    onDragFinish: "Dragging finished {{list}}",
    orderChangeSuccess:
      "Successfully changed display order of identity providers",
    orderChangeError:
      "Could not change display order of identity providers {{error}}",
    alias: "Alias",
    displayName: "Display name",
    useDiscoveryEndpoint: "Use discovery endpoint",
    discoveryEndpoint: "Discovery endpoint",
    importConfig: "Import config from file",
    showMetaData: "Show metadata",
    hideMetaData: "Hide metadata",
    noValidMetaDataFound: "No valid metadata was found at this URL",
    advanced: "Advanced",
    metadataOfDiscoveryEndpoint: "Metadata of the discovery endpoint",
    authorizationUrl: "Authorization URL",
    passLoginHint: "Pass login_hint",
    passCurrentLocale: "Pass current locale",
    tokenUrl: "Token URL",
    logoutUrl: "Logout URL",
    backchannelLogout: "Backchannel logout",
    disableUserInfo: "Disable user info",
    userInfoUrl: "User Info URL",
    issuer: "Issuer",
    scopes: "Scopes",
    prompt: "Prompt",
    prompts: {
      unspecified: "Unspecified",
      none: "None",
      consent: "Consent",
      login: "Login",
      select_account: "Select account",
    },
    clientAuthentication: "Client authentication",
    clientAuthentications: {
      clientAuth_post: "Client secret sent as post",
      clientAuth_basic: "Client secret sent as basic auth",
      clientAuth_secret_jwt: "Client secret as jwt",
      clientAuth_privatekey_jwt: "JWT signed with private key",
    },
    acceptsPromptNone: "Accepts prompt=none forward from client",
    validateSignature: "Validate Signatures",
    useJwksUrl: "Use JWKS URL",
    jwksUrl: "JWKS URL",
    allowedClockSkew: "Allowed clock skew",
    forwardParameters: "Forwarded query parameters",
    generalSettings: "General settings",
    oidcSettings: "OpenID Connect settings",
    advancedSettings: "Advanced settings",
    storeTokens: "Store tokens",
    trustEmail: "Trust Email",
    accountLinkingOnly: "Account linking only",
    hideOnLoginPage: "Hide on login page",
    firstBrokerLoginFlowAlias: "First login flow",
    postBrokerLoginFlowAlias: "Post login flow",
    syncMode: "Sync mode",
    syncModes: {
      import: "Import",
      legacy: "Legacy",
      force: "Force",
    },
  },
};
