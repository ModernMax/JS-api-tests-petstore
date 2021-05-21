/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  "/pet/{petId}": {
    /** Returns a single pet */
    get: operations["getPetById"];
    delete: operations["deletePet"];
  };
  "/pet/{petId}/uploadImage": {
    post: operations["uploadFile"];
  };
  "/pet": {
    /** Returns updated pet */
    put: operations["updatePet"];
    /** Returns created pet */
    post: operations["addPet"];
  };
  "/pet/findByStatus": {
    /** Multiple status values can be provided with comma separated strings */
    get: operations["findPetsByStatus"];
  };
  "/pet/findByTags": {
    /** Multiple tags can be provided with comma separated strings. Use tag1, tag2, tag3 for testing. */
    get: operations["findPetsByTags"];
  };
  "/store/order/{orderId}": {
    /** For valid response try integer IDs with value >= 1 and <= 10 */
    get: operations["getOrderById"];
    delete: operations["deleteOrder"];
  };
  "/store/inventory": {
    /** Returns a map of status codes to quantities */
    get: operations["getInventory"];
  };
  "/store/order": {
    post: operations["placeOrder"];
  };
  "/user/{id}": {
    get: operations["getUserById"];
    /** This can only be done by the logged in user. */
    delete: operations["deleteUser"];
  };
  "/user/login": {
    get: operations["loginUser"];
  };
  "/user/logout": {
    get: operations["logoutUser"];
  };
  "/user/register": {
    /** Register new user */
    post: operations["registerUser"];
  };
  "/user/create": {
    /** This can only be done by admin */
    post: operations["createUser"];
  };
  "/user": {
    /** This can only be done by the logged in user. */
    put: operations["updateUser"];
  };
}

export interface definitions {
  Category: {
    id: number;
    name: string;
  };
  Pet: {
    id: number;
    category: definitions["Category"];
    name: string;
    photoUrls: string[];
    tags: definitions["Tag"][];
    /** pet status in the store */
    status: "available" | "pending" | "sold";
  };
  Tag: {
    id: number;
    name: string;
  };
  AbstractApiResponse: {
    type?: string;
    message?: string;
  };
  Inventory: {
    available: number;
    pending: number;
    sold: number;
  };
  Order: {
    id: number;
    petId: number;
    quantity: number;
    shipDate: string;
    /** Order Status */
    status: "placed" | "approved" | "delivered";
    complete?: boolean;
  };
  User: {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
    /** User Status */
    userStatus: number;
  };
}

export interface operations {
  /** Returns a single pet */
  getPetById: {
    parameters: {
      path: {
        /** ID of pet to return */
        petId: number;
      };
    };
    responses: {
      /** successful operation */
      200: {
        schema: definitions["Pet"];
      };
      /** Invalid ID supplied */
      400: unknown;
      /** Pet not found */
      404: unknown;
    };
  };
  deletePet: {
    parameters: {
      header: {
        /** Admin only */
        token: string;
      };
      path: {
        /** Pet id to delete */
        petId: number;
      };
    };
    responses: {
      /** successful operation */
      200: {
        schema: definitions["AbstractApiResponse"];
      };
      /** Invalid ID supplied */
      400: unknown;
      /** Must have admin permissions to access this endpoint */
      401: unknown;
      /** Pet not found */
      404: unknown;
    };
  };
  uploadFile: {
    parameters: {
      header: {
        /** Admin only */
        token: string;
      };
      path: {
        /** ID of pet to update */
        petId: number;
      };
      formData: {
        /** file to upload */
        file?: { [key: string]: any };
      };
    };
    responses: {
      /** successful operation */
      200: {
        schema: definitions["AbstractApiResponse"];
      };
      /** Must have admin permissions to access this endpoint */
      401: unknown;
      /** Cannot process file */
      500: unknown;
    };
  };
  /** Returns updated pet */
  updatePet: {
    parameters: {
      header: {
        /** Admin only */
        token: string;
      };
      body: {
        /** Pet object that needs to be added to the store */
        body: definitions["Pet"];
      };
    };
    responses: {
      /** successful operation */
      200: {
        schema: definitions["Pet"];
      };
      /** Wrong pet structure */
      400: unknown;
      /** Must have admin permissions to access this endpoint */
      401: unknown;
    };
  };
  /** Returns created pet */
  addPet: {
    parameters: {
      header: {
        /** Admin only */
        token: string;
      };
      body: {
        /** Pet object that needs to be added to the store */
        body: definitions["Pet"];
      };
    };
    responses: {
      /** successful operation */
      200: {
        schema: definitions["Pet"];
      };
      /** Wrong pet structure */
      400: unknown;
      /** Must have admin permissions to access this endpoint */
      401: unknown;
    };
  };
  /** Multiple status values can be provided with comma separated strings */
  findPetsByStatus: {
    parameters: {
      query: {
        /** Status values that need to be considered for filter */
        status: ("available" | "pending" | "sold")[];
      };
    };
    responses: {
      /** successful operation */
      200: {
        schema: definitions["Pet"][];
      };
      /** Invalid status value */
      400: unknown;
    };
  };
  /** Multiple tags can be provided with comma separated strings. Use tag1, tag2, tag3 for testing. */
  findPetsByTags: {
    parameters: {
      query: {
        /** Tags to filter by */
        tags: string[];
      };
    };
    responses: {
      /** successful operation */
      200: {
        schema: definitions["Pet"][];
      };
      /** Invalid tag value */
      400: unknown;
    };
  };
  /** For valid response try integer IDs with value >= 1 and <= 10 */
  getOrderById: {
    parameters: {
      header: {
        /** Admin only */
        token: string;
      };
      path: {
        /** ID of pet that needs to be fetched */
        orderId: number;
      };
    };
    responses: {
      /** successful operation */
      200: {
        schema: definitions["Order"];
      };
      /** Must have admin permissions to access this endpoint */
      401: unknown;
      /** Order not found */
      404: unknown;
    };
  };
  deleteOrder: {
    parameters: {
      header: {
        /** Admin only */
        token: string;
      };
      path: {
        /** ID of the order that needs to be deleted */
        orderId: number;
      };
    };
    responses: {
      /** Must have admin permissions to access this endpoint */
      401: unknown;
      /** Order not found */
      404: unknown;
    };
  };
  /** Returns a map of status codes to quantities */
  getInventory: {
    parameters: {
      header: {
        /** Admin only */
        token: string;
      };
    };
    responses: {
      /** successful operation */
      200: {
        schema: definitions["Inventory"];
      };
      /** Invalid ID supplied */
      400: unknown;
      /** Must have admin permissions to access this endpoint */
      401: unknown;
    };
  };
  placeOrder: {
    parameters: {
      header: {
        /** User only */
        token: string;
      };
      body: {
        /** order placed for purchasing the pet */
        body: definitions["Order"];
      };
    };
    responses: {
      /** successful operation */
      200: {
        schema: definitions["Order"];
      };
      /** Wrong Order structure */
      400: unknown;
      /** Must have user permissions to access this endpoint */
      401: unknown;
    };
  };
  getUserById: {
    parameters: {
      header: {
        token?: string;
      };
      path: {
        /** user id */
        id: number;
      };
    };
    responses: {
      /** successful operation */
      200: {
        schema: definitions["User"];
      };
      /** Must have admin permissions to access this endpoint */
      401: unknown;
      /** User not found */
      404: unknown;
    };
  };
  /** This can only be done by the logged in user. */
  deleteUser: {
    parameters: {
      header: {
        token?: string;
      };
      path: {
        /** User id to delete */
        id: number;
      };
    };
    responses: {
      /** successful operation */
      200: {
        schema: definitions["AbstractApiResponse"];
      };
      /** User not found */
      404: unknown;
    };
  };
  loginUser: {
    parameters: {
      query: {
        /** The user name for login */
        username: string;
        /** The password for login in clear text */
        password: string;
      };
    };
    responses: {
      /** successful operation */
      200: {
        headers: {};
        schema: definitions["AbstractApiResponse"];
      };
      /** Invalid username/password supplied */
      403: unknown;
    };
  };
  logoutUser: {
    parameters: {};
    responses: {
      /** successful operation */
      default: unknown;
    };
  };
  /** Register new user */
  registerUser: {
    parameters: {
      body: {
        /** User to create */
        body: definitions["User"];
      };
    };
    responses: {
      /** successful operation */
      200: {
        schema: definitions["User"];
      };
      /** Wrong user structure */
      400: unknown;
    };
  };
  /** This can only be done by admin */
  createUser: {
    parameters: {
      header: {
        token?: string;
      };
      body: {
        /** User to create */
        body: definitions["User"];
      };
    };
    responses: {
      /** successful operation */
      200: {
        schema: definitions["User"];
      };
      /** Wrong user structure */
      400: unknown;
    };
  };
  /** This can only be done by the logged in user. */
  updateUser: {
    parameters: {
      header: {
        token?: string;
      };
      body: {
        /** Updated user object */
        body: definitions["User"];
      };
    };
    responses: {
      /** successful operation */
      200: {
        schema: definitions["User"];
      };
      /** Invalid user supplied */
      400: unknown;
      /** User not found */
      404: unknown;
    };
  };
}
