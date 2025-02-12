import styled from '@emotion/styled';
import { Avatar } from 'twenty-ui';

import { getDisplayNameFromParticipant } from '@/activities/emails/utils/getDisplayNameFromParticipant';
import { CoreObjectNameSingular } from '@/object-metadata/types/CoreObjectNameSingular';
import { RecordChip } from '@/object-record/components/RecordChip';
import { getImageAbsoluteURIOrBase64 } from '~/utils/image/getImageAbsoluteURIOrBase64';

const StyledAvatar = styled(Avatar)`
  margin-right: ${({ theme }) => theme.spacing(1)};
`;

const StyledSenderName = styled.span<{ variant?: 'default' | 'bold' }>`
  color: ${({ theme }) => theme.font.color.primary};
  font-size: ${({ theme }) => theme.font.size.md};
  font-weight: ${({ theme, variant }) =>
    variant === 'bold' ? theme.font.weight.medium : theme.font.weight.regular};
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StyledContainer = styled.div`
  align-items: flex-start;
  display: flex;
`;

const StyledRecordChip = styled(RecordChip)<{ variant: 'default' | 'bold' }>`
  font-weight: ${({ theme, variant }) =>
    variant === 'bold' ? theme.font.weight.medium : theme.font.weight.regular};
`;

const StyledChip = styled.div`
  align-items: center;
  display: flex;
  padding: ${({ theme }) => theme.spacing(1)};
  height: 20px;
  box-sizing: border-box;
`;

type ParticipantChipVariant = 'default' | 'bold';

export const ParticipantChip = ({
  participant,
  variant = 'default',
  className,
}: {
  participant: any;
  variant?: ParticipantChipVariant;
  className?: string;
}) => {
  const { person, workspaceMember } = participant;

  const displayName = getDisplayNameFromParticipant({
    participant,
    shouldUseFullName: true,
  });

  const avatarUrl = person?.avatarUrl ?? workspaceMember?.avatarUrl ?? '';

  return (
    <StyledContainer className={className}>
      {person ? (
        <StyledRecordChip
          objectNameSingular={CoreObjectNameSingular.Person}
          record={person}
          variant={variant}
        />
      ) : (
        <StyledChip>
          <StyledAvatar
            avatarUrl={getImageAbsoluteURIOrBase64(avatarUrl)}
            type="rounded"
            placeholder={displayName}
            size="sm"
          />
          <StyledSenderName variant={variant}>{displayName}</StyledSenderName>
        </StyledChip>
      )}
    </StyledContainer>
  );
};
