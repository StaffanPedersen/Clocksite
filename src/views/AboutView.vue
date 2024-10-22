<template>
  <h1>This is an about page</h1>
  <div class="about">
    <div>
      <p>Obviously a page about watches..</p>
      <p>
        And also a project page for portfolio and other ideas. This was intended to be a page for
        displaying watches and craftmanship with added functions for blog
      </p>
      <p>
        A whole backend was build with api making work with crud for adding, editing and deleting
        blogs. Images was also added and api to upload to the server.
      </p>
      <p>
        Safety was next when server was put online. It is running on Ubuntu server, configured with
        nginx, communication is set up with crud, csp, and login is controlled with jwt so api calls
        needs to verified
      </p>
    </div>
  </div>
</template>

<style>
h1 {
  color: white;
  font-size: 2rem;
  margin-bottom: 1rem;
  text-align: center;
}

p {
  display: block;
  font-size: 1.5rem;
  color: white;
}

.about {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  color: white;
}

@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    color: white;
  }
}
</style>
s
