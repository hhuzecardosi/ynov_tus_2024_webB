<?php

namespace kata\TripServiceKata\Trip;

use kata\TripServiceKata\Exception\UserNotLoggedInException;
use kata\TripServiceKata\User\User;
use kata\TripServiceKata\User\UserSession;
use kata\TripServiceKata\Trip\TripDAO;

class TripService
{
    /** @var \kata\TripServiceKata\Trip\ITripDAO  */
    private $tripDao;

    /** @param ITripDao|mixed $tripDao */
    function __construct($tripDao = null)
    {
        $this->tripDao = $tripDao ?? new TripDao();
    }

    public function getTripsByUser(User $user) {
        $tripList = array();
        $loggedUser = $this->getLoggedUser();
        $isFriend = false;
        if ($loggedUser != null) {
            foreach ($user->getFriends() as $friend) {
                if ($friend == $loggedUser) {
                    $isFriend = true;
                    break;
                }
            }
            if ($isFriend) {
                $tripList = $this->getTrips($user);
            }
            return $tripList;
        } else {
            throw new UserNotLoggedInException();
        }
    }

    /**
     * @return mixed
     */
    protected function getLoggedUser()
    {
        return UserSession::getInstance()->getLoggedUser();
    }

    /**
     * @param User $user
     * @return mixed
     */
    protected function getTrips(User $user)
    {
        return $this->tripDao->findTripsByUser($user);
    }
}
