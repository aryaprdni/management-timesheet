import { Box, Button, Divider, Flex, Heading, Input, InputGroup, InputLeftElement, Tab, TabList, TabPanel, TabPanels, Table, TableContainer, Tabs, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { CiCirclePlus } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
import { IoFilterSharp } from "react-icons/io5";
import { TbCaretUpDownFilled } from "react-icons/tb";
import { FiEdit3 } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";

const Content = () => {
    return (
        <Box>
            <Heading as='h3' size='lg' pl={6} pt={6} pb={6} bg={"white"} mt={2}>
                HH Timesheet
            </Heading>
            <Tabs>
                <TabList pl={10} bg={"white"}>
                    <Tab>Daftar Kegiatan</Tab>
                    <Tab>Pengaturan</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
                        <Box bg={'white'} h={'68vh'} borderRadius={12} pb={6} pt={6}>
                            <Flex gap={16} pl={10} pb={6}>
                                <Box>
                                    <Text>Nama Karyawan</Text>
                                    <Text>Arya Perdana Irawan</Text>
                                </Box>
                                <Box>
                                    <Text>Rate</Text>
                                    <Text>Rp12.000/jam</Text>
                                </Box>
                            </Flex>
                            <Divider w={'100%'} />
                            <Flex ml={10} mr={10} mt={6} gap={10} justifyContent={"space-between"}>
                                <Flex gap={4}>
                                    <Text fontWeight={'bold'}>Daftar Kegiatan</Text>
                                    <Button size='xs' height='32px' width='135px' color='brand.blue' textAlign={'center'}>
                                        <CiCirclePlus fontSize="18px" fontWeight={"bold"} />
                                        <Text ml={2}>Tambah Kegiatan</Text>
                                    </Button>
                                </Flex>
                                <Flex gap={4}>
                                    <InputGroup>
                                        <InputLeftElement pointerEvents='none'>
                                            <CiSearch color='gray.300' />
                                        </InputLeftElement>
                                        <Input type='tel' placeholder='Cari' />
                                    </InputGroup>
                                    <Button bg={"white"} border={"0.1px solid"} borderColor={"gray.300"}>
                                        <IoFilterSharp fontSize="30px" color="red" />
                                    </Button>
                                </Flex>
                            </Flex>

                            <TableContainer maxW="100%" overflowX="auto" mx={5} mt={5} border="1px solid" borderColor="gray.200" borderRadius={12}>
                                <Table variant='simple' border="1px solid" borderColor="gray.200">
                                    <Thead>
                                        <Tr >
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
                                        <Tr>
                                            <Td border="1px solid" borderColor="gray.200">Pembuatan Sistem</Td>
                                            <Td border="1px solid" borderColor="gray.200">Nama Proyek Contoh</Td>
                                            <Td border="1px solid" borderColor="gray.200">2 Okt 2023</Td>
                                            <Td border="1px solid" borderColor="gray.200">2 Okt 2023</Td>
                                            <Td border="1px solid" borderColor="gray.200">08:50</Td>
                                            <Td border="1px solid" borderColor="gray.200">17:30</Td>
                                            <Td border="1px solid" borderColor="gray.200">8 Jam 40 Menit</Td>
                                            <Td border="1px solid" borderColor="gray.200">
                                                <Flex gap={2}>
                                                    <Text color={'brand.red'}><FiEdit3 /></Text>
                                                    <Text color={'brand.red'}><MdDeleteOutline /></Text>
                                                </Flex>
                                            </Td>
                                        </Tr>
                                        <Tr>
                                            <Td border="1px solid" borderColor="gray.200">Pembuatan Sistem</Td>
                                            <Td border="1px solid" borderColor="gray.200">Nama Proyek Contoh</Td>
                                            <Td border="1px solid" borderColor="gray.200">2 Okt 2023</Td>
                                            <Td border="1px solid" borderColor="gray.200">2 Okt 2023</Td>
                                            <Td border="1px solid" borderColor="gray.200">08:50</Td>
                                            <Td border="1px solid" borderColor="gray.200">17:30</Td>
                                            <Td border="1px solid" borderColor="gray.200">8 Jam 40 Menit</Td>
                                            <Td border="1px solid" borderColor="gray.200">
                                                <Flex gap={2}>
                                                    <Text color={'brand.red'}><FiEdit3 /></Text>
                                                    <Text color={'brand.red'}><MdDeleteOutline /></Text>
                                                </Flex>
                                            </Td>
                                        </Tr>
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
                    <TabPanel>
                        <Box bg={'white'} padding={12} maxWidth={'40%'} minHeight={'40%'} m={'0 auto'} borderRadius={10}>
                            <Text mb='8px'>Nama Karyawan</Text>
                            <Input
                                placeholder='Nama Karyawan'
                                size='md'
                            />
                            <Text mb='8px' mt={6}>Rate</Text>
                            <Input
                                placeholder='Here is a sample placeholder'
                                size='md'
                            />
                            <Flex justifyContent={'center'} gap={5} mt={6}>
                                <Button colorScheme='gray' color="brand.blue" maxWidth={'500px'}>Batalkan</Button>
                                <Button colorScheme='blue'>Simpan</Button>
                            </Flex>
                        </Box>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    );
};

export default Content;
