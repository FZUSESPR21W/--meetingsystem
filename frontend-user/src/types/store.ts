import { UserModal } from '@/components';
import { initialState as IndexInitialState } from '@/pages/models';
import { initialState as UserInitialState } from '@/models';

type IndexModel = typeof IndexInitialState;
type UserModal = typeof UserInitialState;

enum ModelNameSpaces {
  Index = 'Index',
  User = 'User',
}

type RootStore = {
  [key in ModelNameSpaces.Index]: IndexModel;
} &
  {
    [key in ModelNameSpaces.User]: UserModal;
  };

export { ModelNameSpaces, RootStore };
