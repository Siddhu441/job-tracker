import Navbar from "../components/Navbar";


export default function Home() {
  return (
    <div>
      <Navbar />
      <main className="py-5">
        <div className="container text-center">
          <h1 className="display-5">Welcome to JobTracker</h1>
          <p className="lead text-muted">
            Track your job applications, interviews, and career progress — all in one smart dashboard.
          </p>

          <div className="row">
            <div className="col-md-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">📌 Track Applications</h5>
                  <p className="card-text">
                    Stay on top of every job you've applied to. Get reminders and manage statuses easily.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">🎯 Interview Prep</h5>
                  <p className="card-text">Access curated prep guides, resources, and tips to ace your interviews.</p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">📊 Analytics</h5>
                  <p className="card-text">
                    Visualize your progress with charts showing applications, responses, and more.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <hr className="my-5" />

          <div className="row">
            <div className="col-lg-6">
              <h4 className="mb-3">Why Use JobTracker?</h4>
              <ul className="list-group text-start">
                <li className="list-group-item">✅ Centralized job tracking</li>
                <li className="list-group-item">✅ Smart reminders</li>
                <li className="list-group-item">✅ Resume & cover letter templates</li>
                <li className="list-group-item">✅ Progress reports</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
