import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Card, Image } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import ActivityStore from '../../../app/stores/activityStore';

interface DetailParms {
  id: string
}

export const ActivityDetails: React.FC<RouteComponentProps<DetailParms>> = ({match, history}) => {
  const activityStore = useContext(ActivityStore);
  const {activity: activity, loadActivity, loadingInital} = activityStore;

  useEffect(() => {
    loadActivity(match.params.id)
  }, [loadActivity, match.params.id]);

  if (loadingInital || !activity) return <LoadingComponent content='Loading activity...' />

    return (
        <Card fluid>
        <Image src={`/assets/categoryImages/${activity!.category}.jpg`} wrapped ui={false} />
        <Card.Content>
          <Card.Header>{activity!.title}</Card.Header>
          <Card.Meta>
            <span>{activity!.date}</span>
          </Card.Meta>
          <Card.Description>
            {activity!.description}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button.Group widths={2}>
              <Button as={Link} to={`/manage/${activity.id}`} basic color='blue'>Edit</Button>
              <Button onClick={() => history.push('/activites')} basic color='grey'>Cancel</Button>
          </Button.Group>
        </Card.Content>
      </Card>
    )
}

export default observer(ActivityDetails);