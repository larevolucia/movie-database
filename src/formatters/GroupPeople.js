export default function GroupPeople(people) {
    const peopleList = people.reduce((acc, person) => {
      const { id, department } = person;
  
      if (!acc[id]) {
        // If the person is not already in the accumulator, add them
        acc[id] = { ...person, department: [department] };
      } else {
        // If the person is already in the accumulator, add the new department
        if (!acc[id].department.includes(department)) {
          acc[id].department.push(department);
        }
      }
  
      return acc;
    }, {});
  
    return Object.values(peopleList);
  }
  