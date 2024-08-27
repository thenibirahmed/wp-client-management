import axios from "axios";

export default axios.create({
  baseURL: eicApiSettings.rest_url + "wp-client-management/v1",
  headers: {
    "X-WP-Nonce": eicApiSettings.nonce,
  },
});