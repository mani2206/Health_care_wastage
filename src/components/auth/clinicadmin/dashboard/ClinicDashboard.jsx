import React, { useEffect } from 'react';

import { Building2, Users, FileText, Activity } from 'lucide-react';
import WelcomeCard from './WelcomeCard';
import StatCard from './StatCard';
import BranchPerformance from './BranchPerformance';
import RecentActivities from './RecentActivities';
import {getDashBoardDocument} from "../../../../services/api"


function ClinicDashboard() {
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await getDashBoardDocument();
        console.log(res);
      } catch (err) {
        console.error(err);
      }
    };

    fetchDashboard();
  }, []);
  return (
    <div className="space-y-8">
      <WelcomeCard />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* <StatCard icon={Building2} title="Total Branches"   value="8"    change="+12%" color="blue"   />
        <StatCard icon={Users}    title="Total Staff"      value="342"  change="+8%"  color="green"  />
        <StatCard icon={FileText} title="Compliance Reports" value="24" change="+15%" color="purple" />
        <StatCard icon={Activity} title="Patient Visits"   value="12.5K" change="+23%" color="orange" /> */}
        <StatCard icon={Building2} title="Total Branches" value="8" change="+12%" color="blue" />
        <StatCard icon={Users} title="Total Staff" value="342" change="+8%" color="green" />
        <StatCard icon={FileText} title="Compliance Reports" value="24" change="+15%" color="purple" />
        <StatCard icon={Activity} title="Patient Visits" value="12.5K" change="+23%" color="orange" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BranchPerformance />
        <RecentActivities />
      </div>
    </div>
  );
}

export default ClinicDashboard;