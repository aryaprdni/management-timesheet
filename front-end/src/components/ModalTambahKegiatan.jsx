import { Box, Button, Divider, Flex, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Text, useDisclosure } from "@chakra-ui/react";
import { CiCirclePlus } from "react-icons/ci";
import { useState, useEffect } from 'react';
import { useTimesheet } from "../hooks/useTimesheet";
import NotificationModal from "./Modal";

function ModalTambahKegiatan() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isTambahProyekOpen, onOpen: onTambahProyekOpen, onClose: onTambahProyekClose } = useDisclosure();
    const [selectedOption, setSelectedOption] = useState('');
    const [showNotification, setShowNotification] = useState(false);
    const [newProyekName, setNewProyekName] = useState('');
    const [proyekOptions, setProyekOptions] = useState([
        'Aplikasi Website',
        'Desain UI',
        'Asisten Virtual',
        'Desain Logo',
        'Aplikasi Timesheet'
    ]);

    const { data, handleChange, handlePost, setData } = useTimesheet(setShowNotification);

    useEffect(() => {
        if (newProyekName) {
            setSelectedOption(newProyekName);
            setData(prevData => ({ ...prevData, nama_proyek: newProyekName }));
        }
    }, [newProyekName, setData]);

    const handleTambahProyek = (e) => {
        const { value } = e.target;
        if (value === 'option6') {
            onTambahProyekOpen();
            onClose();
        } else {
            setSelectedOption(value);
            setData(prevData => ({ ...prevData, nama_proyek: value }));
        }
    };

    const handleCloseTambahProyek = () => {
        onTambahProyekClose();
        onOpen();
    };

    const handleSimpanProyekBaru = () => {
        setProyekOptions([...proyekOptions, newProyekName]);
        setSelectedOption(newProyekName);
        setData(prevData => ({ ...prevData, nama_proyek: newProyekName }));
        setNewProyekName('');
        handleCloseTambahProyek();
    };

    const handleCloseNotification = () => {
        setShowNotification(false);
        onClose();
    };

    return (
        <>
            <Button onClick={onOpen} size='xs' height='32px' width='145px' color='brand.blue' textAlign={'center'}>
                <Text fontSize="18px" fontWeight={"bold"}>
                    <CiCirclePlus />
                </Text>
                <Text ml={2}>Tambah Kegiatan</Text>
            </Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent maxWidth='700px'>
                    <ModalHeader>Tambah Kegiatan Baru</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Divider />
                        <form onSubmit={handlePost}>
                            <Flex gap={4} mt={4} mb={4}>
                                <Box>
                                    <Text mb={3}>Tanggal Mulai</Text>
                                    <Input placeholder='13 Okt 2023' size='md' type='date' name="tanggal_mulai" onChange={handleChange} value={data.tanggal_mulai} />
                                </Box>
                                <Box>
                                    <Text mb={3}>Tanggal Berakhir</Text>
                                    <Input placeholder='13 Okt 2023' size='md' type='date' name="tanggal_berakhir" onChange={handleChange} value={data.tanggal_berakhir} />
                                </Box>
                                <Box>
                                    <Text mb={3}>Jam Mulai</Text>
                                    <Input placeholder='08:00' size='md' type='time' name="jam_mulai" onChange={handleChange} value={data.jam_mulai} />
                                </Box>
                                <Box>
                                    <Text mb={3}>Jam Berakhir</Text>
                                    <Input placeholder='17:00' size='md' type='time' name="jam_berakhir" onChange={handleChange} value={data.jam_berakhir} />
                                </Box>
                            </Flex>
                            <Box>
                                <Text mb={4}>Judul Kegiatan</Text>
                                <Input size='md' mb={4} name="judul_kegiatan" onChange={handleChange} value={data.judul_kegiatan} />
                            </Box>
                            <Box>
                                <Text mb={3}>Nama Proyek</Text>
                                <Select onChange={handleTambahProyek} value={selectedOption} name="nama_proyek">
                                    <option value=''></option>
                                    <option value='option6' style={{ color: 'red' }}>Tambah Proyek</option>
                                    {proyekOptions.map((option, index) => (
                                        <option key={index} value={option}>{option}</option>
                                    ))}
                                </Select>
                            </Box>

                            <ModalFooter>
                                <Button colorScheme='white' mr={3} onClick={onClose} color={'brand.red'}>
                                    Kembali
                                </Button>
                                <Button colorScheme='red' type="submit">
                                    Simpan
                                </Button>
                            </ModalFooter>
                        </form>
                    </ModalBody>
                </ModalContent>
            </Modal>

            <Modal isOpen={isTambahProyekOpen} onClose={handleCloseTambahProyek}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Tambah Proyek Baru</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box>
                            <Input placeholder="Nama Proyek" mb={4} value={newProyekName} onChange={(e) => setNewProyekName(e.target.value)} />
                        </Box>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='white' mr={3} onClick={handleCloseTambahProyek} color={'brand.red'}>
                            Batal
                        </Button>
                        <Button colorScheme='red' onClick={handleSimpanProyekBaru}>
                            Simpan Proyek
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            {/* Modal Notification */}
            {showNotification && (
                <NotificationModal
                    isOpen={true}
                    onClose={handleCloseNotification}
                    modalBody="Menambahkan data"
                    modalTitle="Notifikasi"
                />
            )}
        </>
    );
}

export default ModalTambahKegiatan;
