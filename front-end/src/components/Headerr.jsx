import { Box } from "@chakra-ui/react"

const Header = () => {
    return (
        <>
            <Box 
                bg={'white'} 
                color="brand.red" 
                fontWeight={'bold'}
                pl={8}
                pt={2}
                pb={2}
            >
                <Box ml={0.5}>Timesheet</Box>
                <Box mt={-2}>Management</Box>
            </Box>
        </>
    )
}

export default Header