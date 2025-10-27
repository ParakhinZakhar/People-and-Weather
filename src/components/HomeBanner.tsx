function HomeBanner() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 grid-rows-3 border shadow-2xl rounded p-8 max-w-4xl lg:my-4 sm:my-2 mx-auto">
      <div className="col-span-1 lg:col-span-2 text-center m-0">
        <h1 className="text-3xl font-bold underline mb-1 sm:mb-0">
          Welcome!
        </h1>
      </div>

      <div className="col-span-1 lg:text-left mt-0">
        <p className="mt-0 mb-1 sm:mb-1">
          This app allows you to view and save random user information
          fetched from an API. According to the user location, the current weather
          is also displayed. Fetch a random user and see their information and weather.
        </p>
      </div>

      <div className="col-span-1 lg:row-start-3 lg:col-start-2 lg:text-left mt-0">
        <p className="mt-2 mb-0 sm:mb-1">
          You will see the details of the fetched user, including name, gender,
          location, email, profile picture, and current weather. You can save this
          user to local storage or check more weather details in a modal.
        </p>
      </div>
    </div>
  )
}

export default HomeBanner;