import config from "./Config";

export default class Data {
  api(
    path,
    method = "GET",
    body = null,
    requiresAuth = false,
    credentials = null
  ) {
    const url = config.apiBaseUrl + path;
    const options = {
      method,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    };
    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    if (requiresAuth) {
      const encodedCredentials = btoa(
        `${credentials.emailAddress}:${credentials.password}`
      );
      options.headers["Authorization"] = `Basic ${encodedCredentials}`;
    }
    return fetch(url, options);
  }

  // creates a getUser async function with emailAddress and password as params
  async getUser(emailAddress, password) {
    const response = await this.api("/users", "GET", null, true, {
      emailAddress,
      password,
    });

    if (response.status === 200) {
      return response.json().then((data) => data);
    } else if (
      response.status === 401 ||
      response.status === 400 ||
      response.status === 500
    ) {
      return null;
    } else {
      throw new Error("Something went wrong");
    }
  }

  // create the createUser async function
  async createUser(user) {
    const response = await this.api("/users", "POST", user);
    if (response.status === 201) {
      return [];
    } else if (response.status === 400) {
      return response.json().then((data) => {
        return data.errors;
      });
    } else {
      throw new Error("Something went wrong");
    }
  }

  // creates the getCourse async function
  async getCourses() {
    const response = await this.api("/courses");
    if (response.status === 200) {
      return response.json().then((data) => data);
    } else {
      throw new Error(`Something went wrong: ${response.status}`);
    }
  }

  // creates the courseDetail async function
  async courseDetail(id) {
    const response = await this.api(`/courses/${id}`);
    if (response.status === 200) {
      return response.json().then((data) => data);
    } else {
      throw new Error(`Something went wrong: ${response.status}`);
    }
  }

  //  create a deleteCourse async function
  async deleteCourse(id, user) {
    const { emailAddress, password } = user;
    const response = await this.api(`/courses/${id}`, "DELETE", {}, true, {
      emailAddress,
      password,
    });
    if (response.status === 204) {
      return [];
    } else {
      throw new Error(`Something went wrong: ${response.status}`);
    }
  }

  // create the updateCourse async function
  async updateCourse(course, user) {
    const { emailAddress, password } = user;
    const response = await this.api(
      `/courses/${course.id}`,
      "PUT",
      course,
      true,
      { emailAddress, password }
    );
    if (response.status === 204) {
      return [];
    } else if (response.status === 400) {
      return response.json().then((data) => {
        return data.errors;
      });
    } else {
      throw new Error(`Something went wrong: ${response.status}`);
    }
  }

  // create the createCourse async funtion
  async createCourse(course, user) {
    const { emailAddress, password } = user;
    const response = await this.api("/courses", "POST", course, true, {
      emailAddress,
      password,
    });
    if (response.status === 201) {
      return [];
    } else if (response.status === 400) {
      return response.json().then((data) => {
        return data.errors;
      });
    } else {
      throw new Error(`Something went wrong: ${response.status}`);
    }
  }
}
