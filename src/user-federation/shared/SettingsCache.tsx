import {
  FormGroup,
  Select,
  SelectOption,
  SelectVariant,
  TextInput,
  TimePicker,
} from "@patternfly/react-core";
import { useTranslation } from "react-i18next";
import React, { useState } from "react";
import { HelpItem } from "../../components/help-enabler/HelpItem";
import { UseFormMethods, useWatch, Controller } from "react-hook-form";
import { FormAccess } from "../../components/form-access/FormAccess";
import _ from "lodash";
import { WizardSectionHeader } from "../../components/wizard-section-header/WizardSectionHeader";

export type SettingsCacheProps = {
  form: UseFormMethods;
  showSectionHeading?: boolean;
  showSectionDescription?: boolean;
};

export const SettingsCache = ({
  form,
  showSectionHeading = false,
  showSectionDescription = false,
}: SettingsCacheProps) => {
  const { t } = useTranslation("user-federation");
  const helpText = useTranslation("user-federation-help").t;

  const [isCachePolicyDropdownOpen, setIsCachePolicyDropdownOpen] = useState(
    false
  );

  const [isEvictionHourDropdownOpen, setIsEvictionHourDropdownOpen] = useState(
    false
  );

  const [hour, setHour] = useState("00");

  const [minute, setMinute] = useState("00");

  const logLoadedValues = () => {
    const values = form.getValues();
    console.log(values);
  };

  const cachePolicyType = useWatch({
    control: form.control,
    name: "config.cachePolicy",
  });

  const [
    isEvictionMinuteDropdownOpen,
    setIsEvictionMinuteDropdownOpen,
  ] = useState(false);

  const [isEvictionDayDropdownOpen, setIsEvictionDayDropdownOpen] = useState(
    false
  );

  const hourOptions = [
    <SelectOption key={0} value={[`${0}`]} isPlaceholder>
      {[`0${0}`]}
    </SelectOption>,
  ];
  let hourDisplay = "";
  for (let index = 1; index < 24; index++) {
    if (index < 10) {
      hourDisplay = `0${index}`;
    } else {
      hourDisplay = `${index}`;
    }
    hourOptions.push(
      <SelectOption key={index} value={[`${index}`]}>
        {hourDisplay}
      </SelectOption>
    );
  }

  const minuteOptions = [
    <SelectOption key={0} value={[`${0}`]} isPlaceholder>
      {[`0${0}`]}
    </SelectOption>,
  ];
  let minuteDisplay = "";
  for (let index = 1; index < 60; index++) {
    if (index < 10) {
      minuteDisplay = `0${index}`;
    } else {
      minuteDisplay = `${index}`;
    }
    minuteOptions.push(
      <SelectOption key={index} value={[`${index}`]}>
        {minuteDisplay}
      </SelectOption>
    );
  
  
  
  }

  return (
    <>
      {showSectionHeading && (
        <WizardSectionHeader
          title={t("cacheSettings")}
          description={helpText("cacheSettingsDescription")}
          showDescription={showSectionDescription}
        />
      )}
      <FormAccess role="manage-realm" isHorizontal>
        <FormGroup
          label={t("cachePolicy")}
          labelIcon={
            <HelpItem
              helpText={helpText("cachePolicyHelp")}
              forLabel={t("cachePolicy")}
              forID="kc-cache-policy"
            />
          }
          fieldId="kc-cache-policy"
        >
          <Controller
            name="config.cachePolicy"
            defaultValue={["DEFAULT"]}
            control={form.control}
            render={({ onChange, value }) => (
              <Select
                toggleId="kc-cache-policy"
                required
                onToggle={() =>
                  setIsCachePolicyDropdownOpen(!isCachePolicyDropdownOpen)
                }
                isOpen={isCachePolicyDropdownOpen}
                onSelect={(_, value) => {
                  onChange(value as string);
                  setIsCachePolicyDropdownOpen(false);
                }}
                selections={value}
                variant={SelectVariant.single}
                data-testid="kerberos-cache-policy"
              >
                <SelectOption key={0} value={["DEFAULT"]} isPlaceholder />
                <SelectOption key={1} value={["EVICT_DAILY"]} />
                <SelectOption key={2} value={["EVICT_WEEKLY"]} />
                <SelectOption key={3} value={["MAX_LIFESPAN"]} />
                <SelectOption key={4} value={["NO_CACHE"]} />
              </Select>
            )}
          ></Controller>
        </FormGroup>
        {_.isEqual(cachePolicyType, ["EVICT_WEEKLY"]) ? (
          <FormGroup
            label={t("evictionDay")}
            labelIcon={
              <HelpItem
                helpText={helpText("evictionDayHelp")}
                forLabel={t("evictionDay")}
                forID="kc-eviction-day"
              />
            }
            isRequired
            fieldId="kc-eviction-day"
          >
            <Controller
              name="config.evictionDay[0]"
              defaultValue={"1"}
              control={form.control}
              render={({ onChange, value }) => (
                <Select
                  data-testid="cache-day"
                  toggleId="kc-eviction-day"
                  required
                  onToggle={() =>
                    setIsEvictionDayDropdownOpen(!isEvictionDayDropdownOpen)
                    
                  }
                  isOpen={isEvictionDayDropdownOpen}
                  onSelect={(_, value) => {
                    onChange(value as string);
                    setIsEvictionDayDropdownOpen(false);
                    logLoadedValues();
                  }}
                  selections={value}
                  variant={SelectVariant.single}
                >
                  <SelectOption key={0} value="1" isPlaceholder>
                    {t("common:Sunday")}
                  </SelectOption>
                  <SelectOption key={1} value="2">
                    {t("common:Monday")}
                  </SelectOption>
                  <SelectOption key={2} value="3">
                    {t("common:Tuesday")}
                  </SelectOption>
                  <SelectOption key={3} value="4">
                    {t("common:Wednesday")}
                  </SelectOption>
                  <SelectOption key={4} value="5">
                    {t("common:Thursday")}
                  </SelectOption>
                  <SelectOption key={5} value="6">
                    {t("common:Friday")}
                  </SelectOption>
                  <SelectOption key={6} value="7">
                    {t("common:Saturday")}
                  </SelectOption>
                </Select>
              )}
            ></Controller>
          </FormGroup>
        ) : (
          <></>
        )}
        {_.isEqual(cachePolicyType, ["EVICT_DAILY"]) ||
        _.isEqual(cachePolicyType, ["EVICT_WEEKLY"]) ? (
          <>
            <FormGroup
              label={t("evictionHour")}
              labelIcon={
                <HelpItem
                  helpText={helpText("evictionHourHelp")}
                  forLabel={t("evictionHour")}
                  forID="kc-eviction-hour"
                />
              }
              isRequired
              fieldId="kc-eviction-hour"
            >
              <Controller
                name="config.evictionHour"
                defaultValue={["0"]}
                control={form.control}
                render={({ onChange, value }) => (
                  <Select
                    toggleId="kc-eviction-hour"
                    onToggle={() =>
                      setIsEvictionHourDropdownOpen(!isEvictionHourDropdownOpen)
                    }
                    isOpen={isEvictionHourDropdownOpen}
                    onSelect={(_, value) => {
                      onChange(value as string);
                      setIsEvictionHourDropdownOpen(false);
                    }}
                    selections={value}
                    variant={SelectVariant.single}
                  >
                    {hourOptions}
                  </Select>
                )}
              ></Controller>
            </FormGroup>

            <FormGroup
              label={t("evictionMinute")}
              labelIcon={
                <HelpItem
                  helpText={helpText("evictionMinuteHelp")}
                  forLabel={t("evictionMinute")}
                  forID="kc-eviction-minute"
                />
              }
              isRequired
              fieldId="kc-eviction-minute"
            >
              <Controller
                name="config.evictionMinute"
                defaultValue={["0"]}
                control={form.control}
                render={({ onChange, value }) => (
                  <Select
                    toggleId="kc-eviction-minute"
                    onToggle={() =>
                      setIsEvictionMinuteDropdownOpen(
                        !isEvictionMinuteDropdownOpen
                      )
                    }
                    isOpen={isEvictionMinuteDropdownOpen}
                    onSelect={(_, value) => {
                      onChange(value as string);
                      setIsEvictionMinuteDropdownOpen(false);
                    }}
                    selections={value}
                    variant={SelectVariant.single}
                  >
                    {minuteOptions}
                  </Select>
                )}
              ></Controller>
            </FormGroup>
            <FormGroup
              label="Time picker test"
              labelIcon={
                <HelpItem
                  helpText={helpText("evictionMinuteHelp")}
                  forLabel={t("evictionMinute")}
                  forID="kc-eviction-minute"
                />
              }
              isRequired
              fieldId="kc-eviction-minute"
            >
              <Controller
                name="evictionTime"
                defaultValue={["00:00"]}
                control={form.control}
                render={() => (
                  <TimePicker is24Hour></TimePicker>
                )}
              ></Controller>
            </FormGroup>
          </>
        ) : (
          <></>
        )}
        {_.isEqual(cachePolicyType, ["MAX_LIFESPAN"]) ? (
          <FormGroup
            label={t("maxLifespan")}
            labelIcon={
              <HelpItem
                helpText={helpText("maxLifespanHelp")}
                forLabel={t("maxLifespan")}
                forID="kc-max-lifespan"
              />
            }
            fieldId="kc-max-lifespan"
          >
            <TextInput
              type="text"
              id="kc-max-lifespan"
              name="config.maxLifespan[0]"
              ref={form.register}
              data-testid="kerberos-cache-lifespan"
            />
          </FormGroup>
        ) : (
          <></>
        )}
      </FormAccess>
    </>
  );
};
