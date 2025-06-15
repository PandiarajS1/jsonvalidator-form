import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:6469",
  headers: {
    "Content-Type": "application/json",
  },
});

export const submitFormData = async (
  schemaid: string,
  formdata: Record<string, any>
) => {
  const res = await api.post(`/formsubmission/${schemaid}`, formdata);
  return res.data;
};

export const uploadSchema = async (schema: object) => {
  const res = await api.post(`/formschema`, {
    Schema: schema,
  });
  return res.data;
};

export const getSchemaAndDataById = async (schemaid: string) => {
  const res = await api.get(`/formschema/${schemaid}`);
  return res.data;
};
