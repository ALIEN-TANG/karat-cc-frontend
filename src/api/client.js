import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

function client(
  endpoint,
  { data, method, token, headers: customHeaders, ...customConfig } = {}
) {
  const config = {
    url: endpoint,
    method,
    data: data ? JSON.stringify(data) : undefined,
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
      "Content-Type": data ? "application/json" : undefined,
      ...customHeaders,
    },
    ...customConfig,
  };
  return axios(config)
    .then(({ data }) => data.data)
    .catch((err) => {
      console.error(err);
      throw new Error(err);
    });
}

export default client;
