import React from "react";
import { Text, Title } from "../../components";

const Dashboard = () => {
  return (
    <div>
      <div>
        <Title variant="sbi-40-1">Welcome Back</Title>
      </div>
      <div style={{ background: "#000" }}>
        <Title variant="osb-49-1">SKILLSEARCH</Title>
        <div>
          <Text variant="ir-20-1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
            pulvinar scelerisque lorem, fermentum lacinia velit pulvinar ut.
            Vivamus placerat maximus auctor. Sed cursus tristique urna, a
            lobortis diam interdum id. Morbi tincidunt urna elementum, mollis
            libero vel, pharetra mauris. Duis lacinia felis ac massa efficitur,
            sed consequat libero tincidunt. Duis a arcu fermentum, posuere nunc
            sit amet, pretium neque. Etiam in lobortis dolor, eu commodo velit.
            Integer bibendum malesuada dignissim. Quisque sagittis massa quis
            dignissim placerat. Donec molestie ex at elit imperdiet, nec maximus
            eros faucibus. Fusce pretium metus est, sit amet facilisis augue
            bibendum suscipit. Cras lobortis luctus ex, ac aliquet dolor semper
            eu. Vestibulum rutrum lobortis mi, id finibus sapien accumsan vel.
          </Text>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
