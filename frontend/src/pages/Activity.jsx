import { useState, useEffect } from "react";
import Service from "../utils/http";
import { 
  Title, Text, Button, Card, Badge, TextInput, Select, 
  Stack, Paper, Group, ThemeIcon, ActionIcon, Modal, Menu, Textarea 
} from "@mantine/core";
import { IconPlus, IconSearch, IconLeaf, IconDroplet, IconEye, 
  IconDotsVertical, IconMapPin, IconEdit, IconTrash 
} from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { useSelector } from 'react-redux';
import { getRole } from '../redux/slice/User';

export const Activity = () => {

  const [ activities, setActivities ] = useState([]);
  const [ search, setSearch ] = useState("");
  const [openedAdd, { open: openAdd, close: closeAdd }] =useDisclosure(false);
  const [openedView, { open: openView, close: closeView }] =useDisclosure(false);
  const [openedEdit, { open: openEdit, close: closeEdit }] =useDisclosure(false);
  const [ selectedActivity, setSelectedActivity ] = useState(null);
  const [ formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    activityType: "",
    status: "Pending",
    ngo: "",
    assignedWorkers: "",
    beneficiary: {
      name: "",
      email: "",
      phone: ""
    },
    newWorkerId: ""
  })

  const service = new Service();
  const userRole = useSelector(getRole);

  const fetchActivities = async () => {
    try {
      const res = await service.get('activity');
      (res && res.data) ? setActivities(res.data) : setActivities([]);
      console.log(" res", res);
    } catch ( error ) {
      console.error(error.message);
    }
  };

  useEffect(()=> {
    fetchActivities();
  }, []);

  const handleCreate = async () => {
    try {
      await service.post("activity", formData);
      fetchActivities();
      closeAdd();
      //setFormData({ title: "", description: "", location: "", activityType: "" });
    } catch (error) {
      console.error("Error creating activity:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      const updateData = {
        title: formData.title,
        description: formData.description,
        location: formData.location,
        activityType: formData.activityType,
        status: formData.status,
        ...(formData.newWorkerId && { newWorkerId: formData.newWorkerId })
      };
      await service.patch(`activity/${selectedActivity._id}`, updateData);
      fetchActivities();
      closeEdit();
    } catch (error) {
      console.error("Error updating activity:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await service.delete(`activity/${id}`);
      fetchActivities();
    } catch (error) {
      console.error("Error deleting activity", error);
    }
  }; 

  const openAddModal = () => {
    setFormData({
      title: "", description: "", location: "", activityType: "", status: "Pending",
      beneficiary: { name: "", email: "", phone: "" },
      newWorkerId: "", assignedWorkers: "", ngo: ""
    });
    openAdd();
  };

  const openViewModal = (activity) => {
    setSelectedActivity(activity);
    openView();
  };

  const openEditModal = (activity) => {
    setSelectedActivity(activity);
    setFormData({
      title: activity.title || "",
      description: activity.description || "",
      location: activity.location || "",
      activityType: activity.activityType || "",
      status: activity.status || "Pending",
      beneficiary: { name: "", email: "", phone: "" },
      newWorkerId: "",
      assignedWorkers: ""
    });
    openEdit();
  };

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
          {userRole === 'admin' && ( 
            <div>
                <Button
                  leftSection={<IconPlus size={18} />}
                  color="green"
                  radius="md"
                  size="md"
                  onClick = { openAddModal }
                >
                  Add Activity
                </Button>
            </div>
          )}
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
                        <ActionIcon variant="subtle" color="gray" onClick={() => openViewModal(activity)}>
                          <IconEye size={18} />
                        </ActionIcon>
                        {userRole === 'admin' && (
                          <Menu shadow="md" width={150} position="bottom-end">
                            <Menu.Target>
                              <ActionIcon variant="subtle" color="gray">
                                <IconDotsVertical size={18} />
                              </ActionIcon>
                            </Menu.Target>
                            <Menu.Dropdown>
                            <Menu.Item 
                              leftSection={<IconEdit size={14} />} 
                              onClick={() => openEditModal(activity)}
                            >
                              Edit
                            </Menu.Item>
                            <Menu.Item 
                              color="red" 
                              leftSection={<IconTrash size={14} />}
                              onClick={() => handleDelete(activity._id)}
                            >
                              Delete
                            </Menu.Item>
                          </Menu.Dropdown>
                          </Menu>
                        )}
                      </Group>    
                  </Group>    
                </Group>
              </Paper>
            ))}
          </Stack>    
        </Stack>
      
      {/* add */}
      <Modal opened={openedAdd} onClose={closeAdd} title="Add New Activity" centered scrollAreaComponent={Modal.NativeScrollArea}>
        <Stack gap="md">
          <TextInput 
            label="Title" 
            value={formData.title} 
            onChange={(e) => setFormData({...formData, title: e.target.value})} 
            required
          />
          <Textarea 
            label="Description" 
            value={formData.description} 
            onChange={(e) => setFormData({...formData, description: e.target.value})} 
          />
          <TextInput 
            label="Location" 
            value={formData.location} 
            onChange={(e) => setFormData({...formData, location: e.target.value})} 
            required
          />
          <Select 
            label="Activity Type" 
            placeholder="Select a type" 
            data={["Education", "Environment", "Other"]}
            value={formData.activityType}
            onChange={(value) => setFormData({...formData, activityType: value})}
          />

          <TextInput 
            label="NGO ID/Name" 
            placeholder="Enter NGO Object ID" 
            value={formData.ngo} 
            onChange={(e) => setFormData({...formData, ngo: e.target.value})} 
            required
          />
          <TextInput 
            label="Assigned Worker ID" 
            placeholder="User Object ID" 
            value={formData.assignedWorkers} 
            onChange={(e) => setFormData({...formData, assignedWorkers: e.target.value})} 
          />
          
          <Text fw={600} mt="sm">Beneficiary</Text>
          <TextInput 
            label="Beneficiary Name" 
            placeholder="Name" 
            value={formData.beneficiary.name} 
            onChange={(e) => setFormData({...formData, beneficiary: { ...formData.beneficiary, name: e.target.value }})} 
            required
          />
          <TextInput 
            label="Beneficiary Email" 
            placeholder="Email" 
            value={formData.beneficiary.email} 
            onChange={(e) => setFormData({...formData, beneficiary: { ...formData.beneficiary, email: e.target.value }})} 
          />
          <TextInput 
            label="Beneficiary Phone" 
            placeholder="Phone number" 
            value={formData.beneficiary.phone} 
            onChange={(e) => setFormData({...formData, beneficiary: { ...formData.beneficiary, phone: e.target.value }})} 
            required
          />

          <Button color="green" fullWidth mt="md" onClick={handleCreate}>
            Submit Activity
          </Button>
        </Stack>
      </Modal>

      {/* 2. edit */}
      <Modal opened={openedEdit} onClose={closeEdit} title="Edit Activity" centered scrollAreaComponent={Modal.NativeScrollArea}>
        <Stack gap="md">
          <TextInput 
            label="Title" 
            value={formData.title} 
            onChange={(e) => setFormData({...formData, title: e.target.value})} 
          />
          <Textarea 
            label="Description" 
            value={formData.description} 
            onChange={(e) => setFormData({...formData, description: e.target.value})} 
          />
          <TextInput 
            label="Location" 
            value={formData.location} 
            onChange={(e) => setFormData({...formData, location: e.target.value})} 
          />
          <Select 
            label="Activity Type" 
            data={["Education", "Environment", "Water", "Other"]}
            value={formData.activityType}
            onChange={(value) => setFormData({...formData, activityType: value})}
          />

          <Select 
            label="Status" 
            data={["Pending", "In Progress", "Completed"]}
            value={formData.status}
            onChange={(value) => setFormData({...formData, status: value})}
          />
          
          <Text fw={600} mt="sm">Assign Workers</Text>
          <TextInput 
            label="New Worker ID" 
            placeholder="Paste User ObjectId here to assign"
            value={formData.newWorkerId} 
            onChange={(e) => setFormData({...formData, newWorkerId: e.target.value})} 
          />

          <Button color="blue" fullWidth mt="md" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Stack>
      </Modal>

      {/* 3. view*/}
      <Modal opened={openedView} onClose={closeView} title="Activity Details" centered scrollAreaComponent={Modal.NativeScrollArea}>
        {selectedActivity && (
          <Stack gap="sm">
            <Text fw={700} size="xl">{selectedActivity.title}</Text>
            <Group>
              <Badge color="green" variant="light">{selectedActivity.activityType || selectedActivity.type || "Other"}</Badge>
              <Badge color={selectedActivity.status === 'Completed' ? "blue" : "orange"} variant="outline">
                {selectedActivity.status || "Pending"}
              </Badge>
            </Group>
            
            <Group gap={5} mt="sm">
              <IconMapPin size={18} color="gray" />
              <Text fw={500}>{selectedActivity.location || "No location provided"}</Text>
            </Group>
            
            <Text mt="sm">{selectedActivity.description}</Text>

            {selectedActivity.beneficiary && (
              <Paper p="sm" mt="md" radius="md" withBorder bg="gray.0">
                <Text fw={600} size="sm" mb="xs">Beneficiary Contact</Text>
                <Text size="sm">Name: {selectedActivity.beneficiary.name}</Text>
                {selectedActivity.beneficiary.email && <Text size="sm">Email: {selectedActivity.beneficiary.email}</Text>}
                <Text size="sm">Phone: {selectedActivity.beneficiary.phone}</Text>
              </Paper>
            )}
            
            <Text size="xs" c="dimmed" mt="xl">
              Activity ID: {selectedActivity._id}
            </Text>
          </Stack>
        )}
      </Modal>
    </>
  );
}