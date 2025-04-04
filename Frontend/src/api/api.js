import { feat1AxiosInstance, feat2AxiosInstance } from "./axiosInstance";

// login route
const login = async () => {
  window.location.href = "http://localhost:3001/api/v1/login";
  //   await feat1AxiosInstance.get("/login");
};

const checkAuth = async () => {
  try {
    const response = await feat1AxiosInstance.get("/auth-check");
    // console.log(response.data);
    return response.data;
  } catch (err) {
    throw err;
  }
};

const publicGetClientProfile = async (encodedId) => {
  try {
    const response = await feat2AxiosInstance.get(
      "/clients/public/" + encodedId
    );
    return response.data;
  } catch (err) {
    throw err;
  }
};

const verifyClientProfile = async (encodedId) => {
  try {
    const response = await feat2AxiosInstance.post("/clients/verify", {
      encodedId,
    });
    return response.data;
  } catch (err) {
    throw err;
  }
};
const getAllAgent = async (encodedId) => {
  try {
    const response = await feat2AxiosInstance.get("/agents", {
      encodedId,
    });
    return response.data;
  } catch (err) {
    throw err;
  }
};

const createAgent = async (agentData) => {
  try {
    const response = await feat2AxiosInstance.post("/agents", agentData);
    return response.data;
  } catch (error) {
    throw error; // Throw error for further handling in your component
  }
};


const getNextAgentID = async (encodedId) => {
  try {
    const response = await feat2AxiosInstance.get("/next-agent-id", {
      encodedId,
    });
    return response.data;
  } catch (err) {
    throw err;
  }
};

const getAgentByID = async (agentId) => {
  try {
    const response = await feat2AxiosInstance.get(`/agents/${agentId}`);
    return response.data;
  } catch (err) {
    throw err;
  }
};

const updateAgent = async (agentData) => {
  console.log("Agent Data:", agentData);  // Log the agent data for debugging
  try {
    const response = await feat2AxiosInstance.put(`/agents/${agentData.agent_id}`, agentData);
    console.log("Response from API:", response.data); // Log the response data
    return response.data;
  } catch (err) {
    console.error("Error occurred during the update:", err);
    throw err;
  }
};

// create new client
const createClient = async (clientData) => {
  try {
    const response = await feat2AxiosInstance.post("/clients", clientData);
    // console.log("client created");
    return response.data;
  } catch (err) {
    throw err;
  }
};

//update client info 
const updateClient = async (clientId, updatedData) => {
  try {
    const response = await feat2AxiosInstance.put(`/clients/${clientId}`, updatedData);
    // console.log("client updated");
    return response.data;
  } catch (err) {
    throw err;
  }
};

// delete client
const deleteClient = async (clientId) => {
  try {
    const response = await feat2AxiosInstance.delete(`/clients/${clientId}`);
    // console.log("client deleted");
    return response.data;
  } catch (err) {
    throw err;
  }
};

//get single client  (admin) 
const getClientAdmin = async (clientId) => {
  try{
    const response = await feat2AxiosInstance.get(`/clients/admin-view/${clientId}`);
    // console.log("client fetched (admin)");
    return response.data;
  } catch (err) {
    throw err;
    }
  };
  

// get single client (agent)
const getClientAgent = async (agentId, clientId) => {
  try {
    const response = await feat2AxiosInstance.get(`/clients/agent-view/${agentId}/${clientId}`);
    // console.log("client fetched (agent)");
    return response.data;
  } catch (err){
    throw err;
  };
};

// get all clients (admin)
const getAllClientsAsAdmin = async () => {
  try {
    const response = await feat2AxiosInstance.get("/clients/admin-view");
    // console.log("all clients fetched (admin)")
    return response.data;
  } catch (err){
    throw err;
  }
};

// get all clients (Agent)
const getClientsByAgent = async (agentId) => {
  try {
    const response = await feat2AxiosInstance.get(`/clients/agent-view/${agentId}`);
    // console.log("all clients fetched (agent)");
    return response.data;
  } catch (err){
    throw err;
  }
};


//creat account
const createAccount = async (accountData) => {
  try {
    const response = await feat2AxiosInstance.post("/accounts", accountData);
    //  console.log("account created");
    return response.data;
  } catch (err) {
    throw err;
  }
};






export { login, checkAuth, publicGetClientProfile, verifyClientProfile, getAllAgent, createAgent, getNextAgentID, getAgentByID, updateAgent , createClient, updateClient, deleteClient, getClientAdmin, getClientAgent, createAccount, getAllClientsAsAdmin, getClientsByAgent}
