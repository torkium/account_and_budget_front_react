import React, { useCallback } from "react";
import { RegisterOptions } from "react-hook-form";
import SelectFetcher from "../../generic/Form/Fields/SelectFetcher";
import { ApiProfileService } from "../../../services/apiProfileService";

interface ProfileSelectProps {
  name: string;
  label: string;
  validationRules?: RegisterOptions;
}

const ProfileSelect: React.FC<ProfileSelectProps> = ({
  name,
  label,
  validationRules,
}) => {
  const loadProfiles = useCallback(async () => {
    const profiles = await new ApiProfileService().get();
    return profiles.map((profile) => ({
      value: profile.id.toString(),
      label: profile.label,
    }));
  }, []);

  return (
    <SelectFetcher
      name={name}
      label={label}
      loadOptionsFunction={loadProfiles}
      validationRules={validationRules}
    />
  );
};

export default ProfileSelect;
