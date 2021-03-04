import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import ActivityStore from '../../../app/stores/activityStore';
import ActivityDetailedHeader from './ActivityDetailedHeader';
import ActivityDetailedInfo from './ActivityDetailedInfo';
import ActivityDetailedChat from './ActivityDetailedChat';
import ActivityDetailedSidebar from './ActivityDetailedSidebar';

interface DetailParms {
  id: string
}

export const ActivityDetails: React.FC<RouteComponentProps<DetailParms>> = ({match}) => {
  const activityStore = useContext(ActivityStore);
  const {activity: activity, loadActivity, loadingInital} = activityStore;

  useEffect(() => {
    loadActivity(match.params.id)
  }, [loadActivity, match.params.id]);

  if (loadingInital || !activity) return <LoadingComponent content='Loading activity...' />

    return (
        <Grid>
          <Grid.Column width={10}>
            <ActivityDetailedHeader activity={activity} />
            <ActivityDetailedInfo activity={activity} />
            <ActivityDetailedChat />
          </Grid.Column>
          <Grid.Column width={6}>
            <ActivityDetailedSidebar />
          </Grid.Column>
        </Grid>
    )
}

export default observer(ActivityDetails);