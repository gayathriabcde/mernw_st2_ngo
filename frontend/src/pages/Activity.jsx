/** import { useState, useEffect } from "react";
import Service from "../utils/http";
import {
  Title,
  Text,
  Button,
  Card,
  Table,
  Badge,
  TextInput,
  Select,
  Stack,
  SimpleGrid,
} from "@mantine/core";

import { IconPlus, IconSearch } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks"; **/

import { useState, useEffect } from 'react';
import Service from "../utils/http";

export const Activity = () => {

  const [ activities, setActivities ] = useState([]);
  const service = new Service();

  const fetchActivities = async () => {
    try {
      const res = await service.get('activity');
      setActivities(res.data);
      console.log(" res", res);
      console.log("activities ", activities);
    } catch ( error ) {
      console.error(error.message);
    }
  };

  useEffect(()=> {
    fetchActivities();
  }, []);

  useEffect(() => {
      console.log("State updated! Activities is now:", activities);
  }, [activities]);

  return (
    <div>
      activity data fetched
    </div>
  );
    /** const[activities, setActivities] = useState([]);
    const[ updatedActivity, setUpdatedActivity ] = useState({});

    const [ opened, {open, close}] = useDisclosure(false);
    const[search, setSearch] = useState("");

    const service = new Service();
    const fetchActivities= async()=>{
        try{
            const res = await service.get("activity");
            console.log("respnose:", res);
            setActivities(res);
        } catch (error) {
            console.error("Error fetching activities:", error);
        }
    };

    useEffect(() => {
        fetchActivities();
    }, [activities]);

    useEffect(() => {
          if (activities && activities.length >0) {
                  setRows(data.map((element) => (
                        <Table.Tr key={element._id}>
                            <Table.Td>{element.originalUrl}</Table.Td>
                            <Table.Td>{element.shortCode}</Table.Td>
                            <Table.Td>{element.clickCount}</Table.Td>
                            <Table.Td>{element.createdAt}</Table.Td>
                            <Table.Td>{element.expiresAt}</Table.Td>
                            <Table.Td> 
                                  <Button variant="subtle" color="orange" onClick={() => handleUpdate(element) }>Edit</Button>
                                  <Button variant="subtle" color="orange" onClick={() => handleDelete(element) }>Delete</Button>
                            </Table.Td>
                        </Table.Tr>
                  )));
              }    
    }, [])

  return (
    <Stack p="md">

      {/* HEADER */}
  //     <div>
  //       <Title order={1}>
  //         Activities Management
  //       </Title>

  //       <Text color="dimmed">
  //         Monitor and coordinate environmental fieldwork efforts.
  //       </Text>
  //     </div>

  //     {/* ADD BUTTON */}
  //     <Button 
  //       leftSection={<IconPlus size={18} />}
  //       color="green"
  //       radius="md"
  //       size="md"
  //     >
  //       Add Activity
  //     </Button>

  //     {/* FILTER CARD */}
  //     <Card shadow="sm" radius="lg" padding="lg">

  //       <Stack>

  //         <TextInput
  //           placeholder="Search activities..."
  //           leftSection={<IconSearch size={18} />}
  //           value={search}
  //           onChange={(e) => setSearch(e.target.value)}
  //         />

  //         <Select
  //           placeholder="All Activity Types"
  //           data={[
  //             "Reforestation",
  //             "Wildlife",
  //             "Water Testing",
  //             "Soil Analysis",
  //           ]}
  //         />

  //       </Stack>
  //     </Card>

  //     {/* TABLE */}
  //     <Card shadow="sm" radius="lg" padding="lg">

  //       <Table striped highlightOnHover>

  //         <Table.Thead>
  //           <Table.Tr>
  //             <Table.Th>Title</Table.Th>
  //             <Table.Th>Type</Table.Th>
  //             <Table.Th>Location</Table.Th>
  //           </Table.Tr>
  //         </Table.Thead>

  //         <Table.Tbody>

  //           {filteredActivities.map((activity) => (

  //             <Table.Tr key={activity._id}>

  //               <Table.Td>
  //                 <Text fw={600}>
  //                   {activity.title}
  //                 </Text>

  //                 <Text size="sm" c="dimmed">
  //                   {activity.description}
  //                 </Text>
  //               </Table.Td>

  //               <Table.Td>
  //                 <Badge color="green">
  //                   {activity.type}
  //                 </Badge>
  //               </Table.Td>

  //               <Table.Td>
  //                 {activity.location}
  //               </Table.Td>

  //             </Table.Tr>

  //           ))}

  //         </Table.Tbody>

  //       </Table>

  //     </Card>

  //     {/* STATS */}
  //     <SimpleGrid cols={3}>

  //       <Card radius="lg" shadow="sm">
  //         <Text size="sm" c="dimmed">
  //           ACTIVE MISSIONS
  //         </Text>

  //         <Title order={2}>
  //           248
  //         </Title>
  //       </Card>

  //       <Card radius="lg" shadow="sm">
  //         <Text size="sm" c="dimmed">
  //           TOTAL BENEFICIARIES
  //         </Text>

  //         <Title order={2}>
  //           14,205
  //         </Title>
  //       </Card>

  //       <Card radius="lg" shadow="sm">
  //         <Text size="sm" c="dimmed">
  //           ACTIVE REGIONS
  //         </Text>

  //         <Title order={2}>
  //           18 Countries
  //         </Title>
  //       </Card>

  //     </SimpleGrid>

  //   </Stack>
  // );**/