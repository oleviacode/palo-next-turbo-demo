async function getDataOnDemand() {
  let res;
  try {
    res = await fetch('http://localhost:3000/api/data/time', {
      next: { revalidate: 30 },
    });
  } catch (e) {
    return;
  }

  return res.json();
}

export default async function Page() {
  console.log('page()');
  const data = await getDataOnDemand();

  if (!data) {
    return <>No data can be fetched</>;
  }

  return <>{data.currentTime}</>;
}