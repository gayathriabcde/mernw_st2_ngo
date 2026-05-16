import { useState, useEffect } from "react";
import Service from "../utils/http";
import { Title, Text, Button, Card, Table, Badge, TextInput, Select, Stack, SimpleGrid, Paper, Group, ThemeIcon, ActionIcon } from "@mantine/core";
import { IconPlus, IconSearch, IconLeaf, IconDroplet, IconEye, IconDotsVertical, IconMapPin } from "@tabler/icons-react";
import { useSelector } from 'react-redux';
import { getRole } from '../redux/slice/User';

export const Activity = () => {

  const [ activities, setActivities ] = useState([]);
  const [ search, setSearch ] = useState("");
  const service = new Service();

  const userRole = useSelector(getRole);

  const fetchActivities = async () => {
    try {
      const res = await service.get('activity');
      setActivities(res.data);
      console.log(" res", res);
    } catch ( error ) {
      console.error(error.message);
    }
  };

  useEffect(()=> {
    fetchActivities();
  }, []);

  useEffect(() => {
      console.log("activities :", activities);
  }, [activities]);

  const filteredActivities = activities.filter((activity) => 
    activity.title?.toLowerCase().includes(search.toLowerCase()) || 
    activity.description?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Stack p="md" gap="md">
          <div>
            <Title order={1}>Activities</Title>
            <Text color="dimmed">
              Monitor field work.
            </Text>
          </div>
          <div>
              <Button
                leftSection={<IconPlus size={18} />}
                color="green"
                radius="md"
                size="md"
              >
                Add Activity
              </Button>
          </div>
          <Card shadow="sm" radius="lg" padding="lg">
            <Stack>
              <TextInput
                placeholder="Search activities..."
                leftSection={<IconSearch size={18} />}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Select
                placeholder="All Activity Types"
                data={[
                  "Education",
                  "Environment",
                  "Other"
                ]}
              />
            </Stack>
          </Card>

          <Stack gap="md">
            {filteredActivities.map((activity) => (
              <Paper key={activity._id} p="md" radius="lg" withBorder>
                <Group justify="space-between" align="center">
                  
                  <Group>
                    <ThemeIcon size={52} radius="md" color="green" variant="light">
                      {activity.title?.includes("Water") ? (
                        <IconDroplet size={24} />
                      ) : (
                        <IconLeaf size={24} />
                      )}
                    </ThemeIcon>
    
                    <Stack gap={2}>
                      <Text fw={700} size="lg">
                        {activity.title}
                      </Text>
                      
                      <Group gap={4}>
                          <IconMapPin size={14} color="gray" />
                          <Text size="sm" c="dimmed">
                            {activity.location || "Location not specified"}
                          </Text>
                      </Group>
    
                      <Text size="sm" mt={4} style={{ maxWidth: '500px' }}>
                        {activity.description}
                      </Text>
                    </Stack>
                  </Group>
                  
                  <Group gap="xl">
                    <Stack gap={2} align="flex-start">
                      <Text size="xs" fw={700} c="dimmed">
                        TYPE
                      </Text>
                      <Badge color="green" variant="light" radius="xl">
                        {activity.activityType || "Other"}
                      </Badge>
                    </Stack>
    
                    <Group gap="xs">
                      <ActionIcon variant="subtle" color="gray">
                        <IconEye size={18} />
                      </ActionIcon>
                      <ActionIcon variant="subtle" color="gray">
                        <IconDotsVertical size={18} />
                      </ActionIcon>
                    </Group>    
                  </Group>    
                </Group>
              </Paper>
            ))}
          </Stack>    
        </Stack>
    </>
  );
}