export default function GroupJobs(movies) {
  const moviesList = movies.reduce((acc, movie) => {
    const { title, job } = movie;
    if (!acc[title]) {
      acc[title] = { ...movie, job: [job] };
    } else {
      acc[title].job.push(job);
    }
    return acc;
  }, {});

  return Object.values(moviesList);
}
