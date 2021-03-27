import { UserModal } from '@/components';
import { initialState as IndexInitialState } from '@/pages/models';
import { initialState as UserInitialState } from '@/models';
import { initialState as DetailInitialState } from '@/pages/detail/models';

type IndexModel = typeof IndexInitialState;
type UserModal = typeof UserInitialState;
type DetailModel = typeof DetailInitialState;

enum ModelNameSpaces {
  Index = 'Index',
  User = 'User',
  Detail = 'Detail',
}

type RootStore = {
  [key in ModelNameSpaces.Index]: IndexModel;
} &
  {
    [key in ModelNameSpaces.User]: UserModal;
  } &
  {
    [key in ModelNameSpaces.Detail]: DetailModel;
  };

export { ModelNameSpaces, RootStore };
