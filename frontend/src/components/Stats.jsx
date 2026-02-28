function Stats({ stats }) {
  return (
    <div className="stats">
      <div className="stat-card">
        <h1>{stats.total}</h1>
        <p>Total Books</p>
      </div>

      <div className="stat-card">
        <h1>{stats.available}</h1>
        <p>Available</p>
      </div>

      <div className="stat-card">
        <h1>{stats.issued}</h1>
        <p>Issued</p>
      </div>
    </div>
  );
}

export default Stats;
