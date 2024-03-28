import { ApiService } from "./generic/apiService"
import { ProfileInterface } from "../interfaces/Profile";

interface ProfileData {
  id?: number
  label: string
}

export class ApiProfileService extends ApiService<ProfileInterface, ProfileData> {
  constructor() {
    super(`/profiles`);
  }
}