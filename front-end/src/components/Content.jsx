import { useState, useEffect } from 'react';
import { Box, Button, Divider, Flex, Heading, Input, InputGroup, InputLeftElement, Tab, TabList, TabPanel, TabPanels, Table, TableContainer, Tabs, Tbody, Td, Text, Th, Thead, Tr, InputRightElement, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, Select } from "@chakra-ui/react";
import { CiSearch } from "react-icons/ci";
import { IoFilterSharp } from "react-icons/io5";
import { TbCaretUpDownFilled } from "react-icons/tb";
import { MdDeleteOutline } from "react-icons/md";
import { useLogin } from "../hooks/useLogin";
import { useSelector } from "react-redux";
import ModalTambahKegiatan from "./ModalTambahKegiatan";
import { useTimesheet } from "../hooks/useTimesheet";
import UpdateTimesheet from './UpdateTimesheet';

const Content = () => {
    const { handleChange, handleLogin } = useLogin();
    const user = useSelector((state) => state.auth.user);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [tabIndex, setTabIndex] = useState(() => {
        const savedIndex = localStorage.getItem('tabIndex');
        return savedIndex ? parseInt(savedIndex) : 0;
    });

    let rateFormatted = "0";
    if (user && user.data && typeof user.data.user.rate !== 'undefined') {
        rateFormatted = user.data.user.rate.toLocaleString('id-ID', { maximumFractionDigits: 3 });
    }

    useEffect(() => {
        localStorage.setItem('tabIndex', tabIndex.toString());
    }, [tabIndex]);

    // GET TIMESHEETS
    const { dataTimesheet, handleDelete, handlePost, handleFilter } = useTimesheet();

    useEffect(() => {
        console.log(dataTimesheet);
    }, [dataTimesheet]);

    const formatDate = (dateString) => {
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('id-ID', options);
    };

    const calculateDuration = (startTime, endTime) => {
        const [startHour, startMinute] = startTime.split(':').map(Number);
        const [endHour, endMinute] = endTime.split(':').map(Number);

        let durationMinutes = (endHour * 60 + endMinute) - (startHour * 60 + startMinute);

        const hours = Math.floor(durationMinutes / 60);
        const minutes = durationMinutes % 60;

        if (minutes === 0) {
            return `${hours} Jam`;
        } else {
            return `${hours} Jam ${minutes} Menit`;
        }
    };

    const [timesheetIdToDelete, setTimesheetIdToDelete] = useState(null);
    const [selectedFilters, setSelectedFilters] = useState([]);

    const handleFilterChange = (event) => {
        const value = event.target.value;
        if (value && !selectedFilters.includes(value)) {
            setSelectedFilters([...selectedFilters, value]);
        }
    };
    
    const handleRemoveFilter = (filter) => {
        setSelectedFilters(selectedFilters.filter(item => item !== filter));
    };
    
    const handleClearFilters = () => {
        setSelectedFilters([]);
    };

    const applyFilters = () => {
        const filterString = selectedFilters.join(',');
        handleFilter(filterString);
        onClose();
    };
    

    return (
        <Box>
            <Heading as='h3' size='lg' pl={6} pt={6} pb={6} bg={"white"} mt={2}>
                HH Timesheet
            </Heading>
            <Tabs index={tabIndex} onChange={(index) => setTabIndex(index)}>
                <TabList pl={10} bg={"white"}>
                    <Tab>Daftar Kegiatan</Tab>
                    <Tab>Pengaturan</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
                        <Box bg={'white'} h={'75vh'} borderRadius={12} pb={6} pt={6}>
                            <Flex gap={16} pl={10} pb={6}>
                                <Box>
                                    <Text>Nama Karyawan</Text>
                                    <Text>{user ? user.data.user.nama_karyawan : "Kosong"}</Text>
                                </Box>
                                <Box>
                                    <Text>Rate</Text>
                                    <Text>Rp{rateFormatted}/jam</Text>
                                </Box>
                            </Flex>
                            <Divider w={'100%'} />
                            <Flex ml={10} mr={10} mt={6} gap={10} justifyContent={"space-between"}>
                                <Flex gap={4}>
                                    <Text fontWeight={'bold'}>Daftar Kegiatan</Text>
                                    <ModalTambahKegiatan handlePost={handlePost} />
                                </Flex>
                                <Flex gap={4}>
                                    <InputGroup>
                                        <InputLeftElement pointerEvents='none'>
                                            <CiSearch color='gray.300' />
                                        </InputLeftElement>
                                        <Input type='tel' placeholder='Cari' />
                                    </InputGroup>
                                    <Button bg={"white"} border={"0.1px solid"} borderColor={"gray.300"}>
                                        <IoFilterSharp fontSize="30px" color="red" onClick={onOpen}/>
                                        <Modal isOpen={isOpen} onClose={onClose}>
                                            <ModalOverlay />
                                            <ModalContent>
                                                <ModalHeader>Filter</ModalHeader>
                                                <ModalCloseButton />
                                                <ModalBody>
                                                    <Text mb={2}>Proyek</Text>
                                                    <Select placeholder='Select option' onChange={handleFilterChange}>
                                                        <option value='Aplikasi Website'>Aplikasi Website</option>
                                                        <option value='Desain UI'>Desain UI</option>
                                                        <option value='Asisten Virtual'>Asisten Virtual</option>
                                                        <option value='Desain Logo'>Desain Logo</option>
                                                        <option value='Aplikasi Timesheet'>Aplikasi Timesheet</option>
                                                    </Select>
                                                    <Flex mt={4} flexWrap="wrap" gap={2}>
                                                        {selectedFilters.map((filter, index) => (
                                                            <Button key={index} size="sm" onClick={() => handleRemoveFilter(filter)}>
                                                                {filter} x
                                                            </Button>
                                                        ))}
                                                    </Flex>
                                                </ModalBody>
                                                <ModalFooter>
                                                    <Button colorScheme='white' color="red" mr={3} onClick={handleClearFilters}>
                                                        Hapus Filter
                                                    </Button>
                                                    <Button colorScheme='red' onClick={applyFilters}>
                                                        Terapkan
                                                    </Button>
                                                </ModalFooter>
                                            </ModalContent>
                                        </Modal>
                                    </Button>
                                </Flex>
                            </Flex>

                            <TableContainer maxW="100%" overflowX="auto" mx={5} mt={5} border="1px solid" borderColor="gray.200" borderRadius={12}>
                                <Table variant='simple' border="1px solid" borderColor="gray.200">
                                    <Thead>
                                        <Tr>
                                            <Th border="1px solid" borderColor="gray.200">
                                                <Box display="flex" alignItems="center">
                                                    <Text>Judul Kegiatan</Text>
                                                    <TbCaretUpDownFilled />
                                                </Box>
                                            </Th>
                                            <Th border="1px solid" borderColor="gray.200">
                                                <Box display="flex" alignItems="center">
                                                    <Text>Nama Proyek</Text>
                                                    <TbCaretUpDownFilled />
                                                </Box>
                                            </Th>
                                            <Th border="1px solid" borderColor="gray.200">
                                                <Box display="flex" alignItems="center">
                                                    <Text>Tanggal Mulai</Text>
                                                    <TbCaretUpDownFilled />
                                                </Box>
                                            </Th>
                                            <Th border="1px solid" borderColor="gray.200">
                                                <Box display="flex" alignItems="center">
                                                    <Text>Tanggal Berakhir</Text>
                                                    <TbCaretUpDownFilled />
                                                </Box>
                                            </Th>
                                            <Th border="1px solid" borderColor="gray.200">
                                                <Box display="flex" alignItems="center">
                                                    <Text>Waktu Mulai</Text>
                                                    <TbCaretUpDownFilled />
                                                </Box>
                                            </Th>
                                            <Th border="1px solid" borderColor="gray.200">
                                                <Box display="flex" alignItems="center">
                                                    <Text>Waktu Berakhir</Text>
                                                    <TbCaretUpDownFilled />
                                                </Box>
                                            </Th>
                                            <Th border="1px solid" borderColor="gray.200">
                                                <Box display="flex" alignItems="center">
                                                    <Text>Durasi</Text>
                                                    <TbCaretUpDownFilled />
                                                </Box>
                                            </Th>
                                            <Th border="1px solid" borderColor="gray.200">
                                                <Box display="flex" alignItems="center">
                                                    <Text>Aksi</Text>
                                                    <TbCaretUpDownFilled />
                                                </Box>
                                            </Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {dataTimesheet.length > 0 ? (
                                            dataTimesheet.map((timesheet, index) => (
                                                <Tr key={index}>
                                                    <Td border="1px solid" borderColor="gray.200">{timesheet.judul_kegiatan}</Td>
                                                    <Td border="1px solid" borderColor="gray.200">{timesheet.nama_proyek}</Td>
                                                    <Td border="1px solid" borderColor="gray.200">{formatDate(timesheet.tanggal_mulai)}</Td>
                                                    <Td border="1px solid" borderColor="gray.200">{formatDate(timesheet.tanggal_berakhir)}</Td>
                                                    <Td border="1px solid" borderColor="gray.200">{timesheet.jam_mulai}</Td>
                                                    <Td border="1px solid" borderColor="gray.200">{timesheet.jam_berakhir}</Td>
                                                    <Td border="1px solid" borderColor="gray.200">{calculateDuration(timesheet.jam_mulai, timesheet.jam_berakhir)}</Td>
                                                    <Td border="1px solid" borderColor="gray.200">
                                                        <Flex gap={2}>
                                                            <UpdateTimesheet timesheet={timesheet}/>
                                                            <Button onClick={() => {
                                                                setTimesheetIdToDelete(timesheet.id);
                                                                onOpen(); 
                                                            }} bg={'white'}>
                                                                <Text color={'brand.red'}><MdDeleteOutline /></Text>
                                                            </Button>

                                                            {/* Modal untuk konfirmasi penghapusan */}
                                                            <Modal isOpen={isOpen && timesheetIdToDelete === timesheet.id} onClose={onClose}>
                                                                <ModalOverlay />
                                                                <ModalContent>
                                                                    <ModalHeader>Konfirmasi Hapus</ModalHeader>
                                                                    <ModalCloseButton />
                                                                    <ModalBody>
                                                                        Yakin ingin menghapus item ini?
                                                                    </ModalBody>
                                                                    <ModalFooter>
                                                                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                                                                            Batal
                                                                        </Button>
                                                                        <Button variant='ghost' onClick={() => {
                                                                            handleDelete(timesheet.id);
                                                                            onClose();
                                                                        }}>
                                                                            Hapus
                                                                        </Button>
                                                                    </ModalFooter>
                                                                </ModalContent>
                                                            </Modal>
                                                        </Flex>
                                                    </Td>
                                                </Tr>
                                            ))
                                        ) : (
                                            <Tr>
                                                <Td colSpan="8" textAlign="center">Tidak ada data tersedia</Td>
                                            </Tr>
                                        )}
                                    </Tbody>
                                </Table>
                            </TableContainer>
                            <Flex flexDirection={'column'} mx={5} gap={3} color={'brand.blue'} bg={'gray.50'} p={4} borderRadius={12}>
                                <Flex justifyContent={'space-between'}>
                                    <Text>Total Durasi</Text>
                                    <Text>8 Jam 50 Menit</Text>
                                </Flex>
                                <Flex justifyContent={'space-between'} fontWeight={'bold'}>
                                    <Text>Total Pendapatan</Text>
                                    <Text>Rp153.000</Text>
                                </Flex>
                            </Flex>
                        </Box>
                    </TabPanel>
                    <TabPanel mt={'12'}>
                        <Box bg={'white'} padding={12} maxWidth={'30%'} minHeight={'30%'} m={'0 auto'} borderRadius={10}>
                            <Text mb='8px'>Nama Karyawan</Text>
                            <Input
                                placeholder='Nama Karyawan'
                                size='md'
                                onChange={handleChange}
                                name="nama_karyawan"
                            />
                            <Text mb='8px' mt='10px'>Rate</Text>
                            <InputGroup size='md'>
                                <Input
                                    placeholder='Contoh: Rp12.000'
                                    onChange={handleChange}
                                    name="rate"
                                />
                                <InputRightElement width='4.5rem'>
                                    <Text color='gray.200'>/jam</Text>
                                </InputRightElement>
                            </InputGroup>
                            <Button width={'100%'} bg={'brand.blue'} mt={'24px'} color={'white'} onClick={handleLogin}>
                                Simpan
                            </Button>
                        </Box>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    );
}

export default Content;
