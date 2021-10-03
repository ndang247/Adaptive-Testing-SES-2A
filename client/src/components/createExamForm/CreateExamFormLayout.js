import React, { useState } from 'react';
import {
    DashboardLayoutRoot, DashboardLayoutWrapper,
    DashboardLayoutContainer, DashboardLayoutContent
} from 'src/components/dashboard/dashboardLayoutStyles';
import DashboardNavbar from 'src/components/dashboard/DashboardNavbar';
import DashboardSidebar from 'src/components/dashboard/DashboardSidebar';
import { CreateExamForm } from 'src/components';

const CreateExamFormLayout = () => {
    const [isMobileNavOpen, setMobileNavOpen] = useState(false);

    return (
        <DashboardLayoutRoot>
            <DashboardNavbar onMobileNavOpen={() => setMobileNavOpen(true)} />
            <DashboardSidebar
                onMobileClose={() => setMobileNavOpen(false)}
                openMobile={isMobileNavOpen}
            />
            <DashboardLayoutWrapper>
                <DashboardLayoutContainer>
                    <DashboardLayoutContent>
                        <CreateExamForm />
                    </DashboardLayoutContent>
                </DashboardLayoutContainer>
            </DashboardLayoutWrapper>
        </DashboardLayoutRoot>
    );
}

export default CreateExamFormLayout;